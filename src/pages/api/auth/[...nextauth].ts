import prisma from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'

const prismaAdapter = PrismaAdapter(prisma)

export const nextAuthOption: NextAuthOptions = {
  adapter: prismaAdapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'emailPass',
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const searchUser = await prisma.user.findFirst({
          where: { email: email },
        })

        if (!searchUser) {
          throw new Error('Email not registered.')
        }

        const isMatch = bcrypt.compareSync(
          password,
          searchUser.password as string
        )

        if (!isMatch) {
          throw new Error('Wrong password.')
        }

        const user = {
          id: searchUser.id,
          name: searchUser.name,
          email: searchUser.email,
          image: searchUser.image,
        }
        return user
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // async signIn(data) {
    //   return true
    // },
    // async jwt({ token, account, profile, user }) {
    //   console.log("from token")
    //   console.log(token)
    //   token.id = token.sub
    //   return token
    // },
    async session({ session, token, user }) {
      const searchAccount = await prisma.account.findFirst({
        where: { userId: token?.sub || user?.id },
      })

      if (!searchAccount?.provider) {
        session.user.editable = true
      }

      if (user?.id) {
        session.user.id = user.id
      }
      if (token?.sub) {
        session.user.id = token.sub
      }
  

      return session
    },
  },
}

export default NextAuth(nextAuthOption)
