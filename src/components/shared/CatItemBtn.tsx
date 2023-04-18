import Link from "next/link";

const CatItemBtn = ({title}: {title?:string}) => {
  return(<button className='btn font-bold btn-xs hover:!bg-primary hover:text-white'>
  <Link href={'/?cat=' + title}>{title}</Link>
</button>);
};

export default CatItemBtn;