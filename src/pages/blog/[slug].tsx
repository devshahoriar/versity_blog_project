import prisma from '@/lib/db'
import { NextPageContext } from 'next'

const index = (s: any) => {
  console.log(s)

  return <div>index</div>
}

export default index

export const getServerSideProps = async (ctx: NextPageContext) => {
  const posts : any = await prisma.post.findFirst({
    where:{
      
    }
  })

  return {
    props: {
      post: posts.post[0],
    },
  }
}
