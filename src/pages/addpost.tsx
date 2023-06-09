/* eslint-disable react-hooks/rules-of-hooks */
import isAuth from "@/lib/isAuth"
import { NextPageContext } from "next"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"

/* eslint-disable @next/next/no-img-element */
const addPost = () => {
  const [selectImage, setSelectImage] = useState<File>()
  const [inTitle, setInTitlw] = useState('')
  const [body, setBody] = useState('')
  const { data, status } = useSession()
  
  
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(()=>{
    if(!selectImage) return
    const reader = new FileReader()
    reader.onloadend = () => {
      imageRef.current.src = reader.result as string
    }
    reader.readAsDataURL(selectImage)
  },[selectImage])

  const _hendelSubmit = () => {
    console.log('clicked');
    
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center mt-10">
        <img ref={imageRef} alt="select image" className="h-72 w-96 object-cover border border-primary" src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"/>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs mt-5"
          onChange={(e) => setSelectImage(e.target.files[0] as File)}
          multiple={false}
        />
        <input placeholder="Post title" className="min-w-[500px] mt-5"/>
        <textarea placeholder="Your post....." className="min-h-[200px] min-w-[500px] mt-5"/>
        <button className="btn mt-5" onClick={() => _hendelSubmit()}>Add Post</button>
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
    props: {}
  }

  
}


export default addPost
