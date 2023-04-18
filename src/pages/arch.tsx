import { NextPageContext } from 'next'
import os from 'os'

const arch = () => {
  return <div>arch</div>
}

export const getServerSideProps = (ctx: NextPageContext) => {
  const installedRam = Math.round(os.totalmem() / 1024 / 1024 / 1024)
  const arc = os.arch()
  const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
  console.log(os.release())

  return {
    props: {},
  }
}

export default arch
