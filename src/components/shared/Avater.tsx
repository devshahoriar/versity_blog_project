/* eslint-disable @next/next/no-img-element */
import { NextPageContext } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { BiUserCircle } from 'react-icons/bi'

const Avater = ({ isLoged }: { isLoged?: boolean }) => {
  const { data } = useSession()
  return (
    <div className="avatar">
      <button className="btn px-0 mx-2 bg-transparent border-none rounded-xl overflow-hidden relative w-12 text-5xl text-black dark:text-white">
        {isLoged ? (
          <Link href="/profile">
            {data?.user?.image ? (
              <img src={data?.user?.image} alt="Avater" />
            ) : (
              <h1>{data?.user?.name?.substring(0, 2)}</h1>
            )}
          </Link>
        ) : (
          <Link href="/login">
            <BiUserCircle />
          </Link>
        )}
      </button>
    </div>
  )
}



export default Avater
