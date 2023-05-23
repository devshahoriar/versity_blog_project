/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import CatItemBtn from './CatItemBtn'
import { Dispatch, SetStateAction } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { SiSimplenote } from 'react-icons/si'
import { GoSignOut } from 'react-icons/go'
import { ImProfile } from 'react-icons/im'
import { motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'

export const cetItem: string[] = [
  // 'Tec',
  // 'Javascrip',
  // 'php',
  // 'python',
  // 'Cse',
  // 'Python',
]

const MobileNav = ({
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>
}) => {
  const { data, status } = useSession()

  return (
    <motion.div
      transition={{ type: 'just' }}
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="fixed top-0 left-0  w-full !z-50 flex justify-end overflow-hidden"
    >
      <div className="py-4 bg-neutral-focus bg-opacity-60 backdrop-blur-md px-2 shadow-lg shadow-neutral-focus text-white h-[100vh] max-w-xs relative">
        <button
          className="btn btn-sm hover:text-primary mt-3 ml-2 dark:bg-slate-500"
          onClick={() => setShow((p) => !p)}
        >
          <FaWindowClose />
        </button>
        <div className="mt-6">
          <div className="bg-slate-600 flex items-center justify-center gap-5 py-3 text-3xl rounded-lg bg-opacity-60">
            <SiSimplenote />
            <h1>My Blog</h1>
          </div>
        </div>
        <div className="h-44 bg-slate-600 bg-opacity-60 mt-6 rounded-lg">
          <div className="p-4">
            {status === 'unauthenticated' ? (
              <h1 className="text-lg">
                <Link className="underline font-bold" href="/login">
                  Sign in
                </Link>{' '}
                or{' '}
                <Link className="underline font-semibold" href="/register">
                  Registar
                </Link>{' '}
                to post blog...
              </h1>
            ) : (
              <div>
                <div className="flex gap-3">
                  <div className="h-20 w-20 bg-slate-500 rounded-md overflow-hidden">
                    <img className='object-cover' src={data?.user?.image as string} alt="user photo" />
                  </div>
                  <div className="mt-2">
                    <h1 className="text-xl">{data?.user?.name}</h1>
                    <h1 className="text-sm">{data?.user?.email}</h1>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <Link href="/profile" className="">
                    <button className="flex items-center gap-3 btn btn-sm">
                      Profile <ImProfile />
                    </button>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 btn btn-sm"
                  >
                    Logout <GoSignOut />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <h1 className="font-semibold text-xl mt-6">Categoris:</h1>
        <div className="flex flex-wrap gap-3 mt-4">
          {cetItem.map((t, i) => (
            <CatItemBtn key={i} title={t} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default MobileNav
