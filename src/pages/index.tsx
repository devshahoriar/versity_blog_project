import Avater from '@/components/shared/Avater'
import BlogCard from '@/components/shared/BlogCard'
import DexktopNav from '@/components/shared/DexktopNav'
import MobileNav from '@/components/shared/MobileNav'
import useMediaQuery from '@/hooks/useMediaQuery'
import { AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineAppstore, AiOutlineBorder } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
import { SiSimplenote } from 'react-icons/si'

/* eslint-disable react/no-unescaped-entities */

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [activeMobileNav, setShowModileNav] = useState(false)
  const [row, setRow] = useState('one')
  const { status } = useSession()
  const login = status === 'authenticated'

  return (
    <>
      <div className="container">
        <nav className="flex justify-between items-center my-4 mx-2">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <SiSimplenote /> My Blog
            </Link>
          </h1>
          <div className="flex items-center flex-row">
            <AnimatePresence>
              {isMobile ? (
                activeMobileNav && <MobileNav setShow={setShowModileNav} />
              ) : (
                <DexktopNav />
              )}
            </AnimatePresence>
            <Avater isLoged={login} />
            {isMobile && (
              <button
                onClick={() => setShowModileNav((p) => !p)}
                className="btn"
              >
                <FaBars />
              </button>
            )}
          </div>
        </nav>
        <div className="mt-5">
          <div className="flex items-center justify-between mx-2">
            <h1 className="text-center text-lg">Latest Blog</h1>
            <div className="flex justify-center space-x-1 mt-2">
              <button
                onClick={() => setRow('one')}
                className={`btn text-2xl btn-xs btn-primary  ${
                  row === 'two' && 'btn-outline'
                }`}
              >
                <AiOutlineAppstore />
              </button>
              <button
                onClick={() => setRow('two')}
                className={`btn text-2xl btn-xs btn-primary  ${
                  row === 'one' && 'btn-outline'
                }`}
              >
                <AiOutlineBorder />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center mx-4">
            {Array(10)
              .fill(1)
              .map((t, i) => (
                <BlogCard key={i} width={row} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
