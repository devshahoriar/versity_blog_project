// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageUrl, text, title, user } = req.body
  try {
    const post = await prisma.post.create({
      data: {
        image: imageUrl,
        content: text,
        title: title,
        authorId: user,
      },
    })
    res.status(200).json({ result: 'post created' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ result: 'error' })
  }
}
