// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  console.log(req.body);
  
  res.status(200).json({})
}
