// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postCount = await prisma.post.count()
  const skip = Math.floor(Math.random() * postCount)
  const posts = await prisma.post.findMany({
    take: 6,
    skip: skip,
  })


  res.status(200).json({posts: posts})
}
