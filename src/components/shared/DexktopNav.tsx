import Link from "next/link";
import CatItemBtn from "./CatItemBtn";
import { cetItem } from "./MobileNav";

const DexktopNav = () => {
  return(<div className="space-x-1 mr-4">{cetItem.map((t, i) => (
    <CatItemBtn key={i} title={t}/>
  ))}</div>);
};

export default DexktopNav;