import Link from "next/link";
import Image from "next/image";
import holiday from "../app/icons/holiday-50.png";
export default function HolidaysTypeLeftPanel() {
  return (
    <Link href="/holidays_type">
      <div className="flex items-center justify-start border p-4 rounded text-center m-4 hover:shadow-md">
        <Image
          src={holiday}
          alt="Employees Icon"
          width={25}
          height={25}
          className=" m-4 "
        />
        <label className="mx-4 cursor-pointer font-bold">Holidays Type</label>
      </div>
    </Link>
  );
}
