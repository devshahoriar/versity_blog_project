/* eslint-disable react-hooks/rules-of-hooks */
import isAuth from '@/lib/isAuth'
import axios from 'axios'
import { NextPageContext } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

/* eslint-disable @next/next/no-img-element */
const addPost = () => {
  const [selectImage, setSelectImage] = useState<File>()
  const imageRef = useRef<HTMLImageElement>(null)
  const { data, status } = useSession()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [err, setErr] = useState('')
  const [info, setInfo] = useState('')
  const router = useRouter()


  useEffect(() => {
    if (!selectImage) return
    const reader = new FileReader()
    reader.onloadend = () => {
      imageRef.current.src = reader.result as string
    }
    reader.readAsDataURL(selectImage)
  }, [selectImage])

  const _hendelSubmit = async () => {
    setErr('')
    setInfo('')
    if (!title || !body || !selectImage) {
      setErr('Please fill all the fields')
      return
    }
    setInfo('image uploading....')
    const fromData = new FormData()
    fromData.append('file', selectImage)
    fromData.append('upload_preset', 'bfbrkm2p')
    try {
      const { data: iData } = await axios.post(
        'https://api.cloudinary.com/v1_1/dow1abm8v/upload',
        fromData
      )
      setInfo('Uplode your post....')
      let imageUrl = iData?.secure_url
      const { data: pData } = await axios.post('/api/addPost', {
        title,
        text: body,
        imageUrl,
        user: data?.user?.id,
      })
      console.log(pData);
      setInfo('Uploded post.')
      setBody('')
      setTitle('')
      selectImage(undefined)
    } catch (error) {}
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center mt-10">
        <img
          ref={imageRef}
          alt="select image"
          className="h-72 w-96 object-cover border border-primary"
          src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
        />
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs mt-5"
          onChange={(e) => setSelectImage(e.target.files[0] as File)}
          multiple={false}
        />
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="input input-bordered input-primary mt-5 min-w-[500px]"
          placeholder="your post title."
        />
        <textarea
          onChange={(e) => setBody(e.target.value)}
          placeholder="Your post....."
          className="input input-bordered input-primary min-h-[200px] min-w-[500px] mt-5"
        />
        <div className='flex gap-5'>
        <button onClick={() => _hendelSubmit()} className="btn mt-5">
          Add Post
        </button>
        <button onClick={() => router.push('/')} className="btn mt-5">
          Go Home
        </button>
        </div>
        <h1 className="text-red-500 mt-5">{err}</h1>
        <h1>{info}</h1>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const isAut: any = await isAuth(ctx)

  if (!isAut) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}

export default addPost
