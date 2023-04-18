import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'only post' })
    return
  }
  const { email, name, password } = req.body
  try {
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        image:
          'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
      },
    })

  
    
    res.status(200)
      .json({
        result: 'account created',
        data: { id: user.id, email: user.email, name: user.name },
      })
    return
  } catch (error) {
    res.status(409).json({ error: 'This email may be already registered.' })
    return
  }
}

export default register
