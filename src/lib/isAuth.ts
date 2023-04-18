import { nextAuthOption } from '@/pages/api/auth/[...nextauth]'
import { NextPageContext } from 'next'
import { getServerSession, Session } from 'next-auth'

const isAuth = async (ctx: NextPageContext) => {
  const session = await getServerSession(ctx.req, ctx.res, nextAuthOption)
  return session
}

export default isAuth
