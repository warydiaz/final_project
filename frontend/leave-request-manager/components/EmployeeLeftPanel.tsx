import Link from "next/link";
import Image from "next/image";
import employees from "../app/icons/employees-50.png";
export default function SectorLeftPanel() {
  return (
    <Link href="/employee">
      <div className="flex items-center justify-start border p-4 rounded text-center m-4 hover:shadow-md">
        <Image src={employees} alt="Employees Icon" width={25} height={25} className=" m-4 "/>
        <label className="ml-2 cursor-pointer font-bold">Employees</label>
      </div>
    </Link>
  );
}
