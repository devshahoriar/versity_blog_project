/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import isAuth from '@/lib/isAuth'
import { NextPageContext } from 'next'
import { signIn ,getProviders, SignInResponse} from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiFillFacebook } from 'react-icons/ai'
import { FaGithubSquare } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
const login = () => {
  const [email,setEmail] = useState<string>("")
  const [pass,setPass] = useState<string>("")
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const loginClick = async () => {
    setError("")
    if(email === "" || pass === ""){
      setError('Enter your email and Password')
      return
    }
    const d = await signIn('emailPass', { redirect: false, password: pass, email }) as SignInResponse
    const {error,ok} = d
    if (!ok) {
      setError(error as string)
      return
    }
    router.replace('/')
    
    
    
  }

  return (
    <div className="container">
      <div className="h-[100vh] w-full flex flex-col items-center justify-center">
        <div className="flex justify-center flex-col min-w-full items-center gap-2">
          <h1 className="font-bold text-2xl mb-4">Login</h1>
          <input
            type="text"
            placeholder="Email"
            className="input w-full max-w-xs input-bordered"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="input w-full max-w-xs input-bordered"
            onChange={e => setPass(e.target.value)}
          />
          <h1 className='text-red-600'>{error}</h1>
          <button onClick={() => loginClick()} className="btn">Sign In</button>
          <h1>Don't have account? <Link className='font-bold text-primary' href='/register'>Create One</Link></h1>
        </div>
        <div className="divider">Other Sign in.</div>

        <div className='flex flex-col gap-2 text-lg'>
          <button onClick={()=> signIn('google')} className="btn btn-outline btn-primary btn-wide btn-sm flex items-center gap-2">
            <FcGoogle />
            Google
          </button>
          <button onClick={()=> signIn('facebook')} className="btn btn-outline btn-primary btn-wide btn-sm flex items-center gap-2">
            <AiFillFacebook />
            Facebook
          </button>
          <button onClick={()=> signIn('github')} className="btn btn-outline btn-primary btn-wide btn-sm flex items-center gap-2">
            <FaGithubSquare />
            Github
          </button>
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

export default login
