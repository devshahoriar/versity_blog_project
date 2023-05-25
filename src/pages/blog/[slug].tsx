/* eslint-disable react-hooks/rules-of-hooks */
import Avater from '@/components/shared/Avater'
import DexktopNav from '@/components/shared/DexktopNav'
import MobileNav from '@/components/shared/MobileNav'
import prisma from '@/lib/db'
import { AnimatePresence } from 'framer-motion'
import { NextPageContext } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { SiSimplenote } from 'react-icons/si'
import { useMediaQuery } from 'usehooks-ts'

const index = ({post}) => {
  const { title, content, image,id } = post
  
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [activeMobileNav, setShowModileNav] = useState(false)
  const [row, setRow] = useState('one')
  const { status } = useSession()
  const login = status === 'authenticated'
  const [postes, setPosts] = useState<any[]>([])

  return (
    <div className="container">
      <nav className="flex justify-between items-center my-4 mx-2">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <SiSimplenote /> My Blog
            </Link>
          </h1>
        </div>
        <div className="flex items-center flex-row">
          <AnimatePresence>
            {isMobile ? (
              activeMobileNav && <MobileNav setShow={setShowModileNav} />
            ) : (
              <DexktopNav />
            )}
          </AnimatePresence>
          {login && (
            <Link
              href="/addpost"
              className="bg-primary  text-white font-bold px-2 py-1 rounded-md"
            >
              Add Post
            </Link>
          )}
          <Avater isLoged={login} />
          {isMobile && (
            <button onClick={() => setShowModileNav((p) => !p)} className="btn">
              <FaBars />
            </button>
          )}
        </div>
      </nav>
      <div className='px-5'>
        <img src={image} alt="" className=' w-full h-80 object-cover' />
        <h1 className='my-5 text-3xl'>{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default index

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { slug } = ctx.query
  const post = await prisma.post.findUnique({
    where: {
      id: Number(slug),
    },
  })
  console.log(post)

  return {
    props: {
      post: post,
    },
  }
}
