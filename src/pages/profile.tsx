/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import prisma from '@/lib/db'
import isAuth from '@/lib/isAuth'
import { NextPageContext } from 'next'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FcHome } from 'react-icons/fc'

const profile = ({
  isAut: { user },
  editProfile: edP,
}: {
  isAut: Session
  editProfile: boolean
}) => {
  const [editProfile, setEditProfile] = useState<boolean>(false)
  return (
    <div className="container">
      {editProfile && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center">
          <div className="h-[400px] w-[600px] bg-black p-20 bg-opacity-30 rounded-md relative">
            <button
              onClick={() => setEditProfile((p) => !p)}
              className="absolute top-8 right-10 text-2xl hover:opacity-70 active:scale-95"
            >
              <AiFillCloseCircle />
            </button>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Name"
                className="input w-full max-w-xs input-bordered"
              />
              <input
                type="text"
                placeholder="Email"
                className="input w-full max-w-xs input-bordered mt-5"
              />
              <input
                accept="image/*"
                multiple={false}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs mt-5"
              />
              <button className="btn w-fit mt-5">Button</button>
            </div>
          </div>
        </div>
      )}
      <div className="h-[100vh] w-full flex justify-center items-center">
        <div className="w-[90%] flex flex-col items-center gap-2">
          <img
            className="rounded-md object-cover h-40 w-40"
            src={user?.image as string}
            alt=""
          />
          <h1 className="text-2xl">{user?.name}</h1>
          <p>{user?.email}</p>
          <p>You posted 10 blog</p>
          <div className="flex gap-3">
            {edP && (
              <button
                className="btn btn-sm"
                onClick={() => setEditProfile((p) => !p)}
              >
                edit profile
              </button>
            )}
            <button className="btn btn-sm bg-red-600" onClick={() => signOut()}>
              Log Out
            </button>
          </div>
          <Link
            className="flex justify-center items-center gap-1 font-bold text-primary"
            href="/"
          >
            Go Home <FcHome />
          </Link>
        </div>
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

  const account = await prisma.account.findFirst({
    where: {
      userId: isAut.user.id,
    },
  })

  return {
    props: {
      isAut,
      editProfile: account ? false : true,
    },
  }
}

export default profile
