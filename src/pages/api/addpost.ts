// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allUsers:any = await prisma.user.findMany()
  console.log(allUsers);
  
  
  res.status(200).json(allUsers)
}
