/* eslint-disable react-hooks/rules-of-hooks */
import isAuth from '@/lib/isAuth'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useCountdown } from 'usehooks-ts'
import { useRouter } from 'next/router'

const register = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [done, setDone] = useState(false)
  const rouer = useRouter()

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 5,
      intervalMs: 1000,
    })

  const register = async () => {
    setError('')
    if (email === '' || password === '' || name === '') {
      setError('Enter Name, Email and Password.')
      return
    }
    try {
      const reg = await axios.post('/api/register', {
        email,
        name,
        password,
      })
      setDone(true)
      startCountdown()
    } catch (error: any) {
      const err = error?.response?.data
      setError(err.error)
    }
  }

  useEffect(() => {
    if (count === 0) {
      rouer.push('/login')
    }
  }, [count, rouer])

  return (
    <div className="container">
      <div className="flex justify-center items-center w-full h-[100vh]">
        <div className="flex justify-center flex-col min-w-full items-center gap-2">
          <h1 className="font-bold text-2xl mb-4">Register</h1>
          <input
            type="text"
            placeholder="Full Name"
            className="input w-full max-w-xs input-bordered"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input w-full max-w-xs input-bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="input w-full max-w-xs input-bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className="text-red-600">{error}</h1>
          {done && <h1>Register done. Go to login in <span className='text-primary'>{count}</span> s</h1>}
          <button onClick={() => register()} className="btn">
            Register
          </button>
          <h1>
            Have account? or{' '}
            <Link className="font-bold text-primary" href="/login">
              Sign In{' '}
            </Link>
            with other Account.
          </h1>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const isAut = await isAuth(ctx)

  if (isAut) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }
  return {
    props: {},
  }
}

export default register
