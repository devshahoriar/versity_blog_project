/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import prisma from '@/lib/db'
import isAuth from '@/lib/isAuth'
import { NextPageContext } from 'next'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
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
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 z-30 bg-slate-500">
          Shuvo
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
