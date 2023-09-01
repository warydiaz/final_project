import Link from "next/link";
import Image from "next/image";
import company from "../app/icons/company-50.png";
export default function SectorLeftPanel() {
  return (
    <Link href="/sector_position">
      <div className="flex items-center justify-start border p-4 rounded text-center m-4 hover:shadow-md">
        <Image
          src={company}
          alt="Sector and position Icon"
          width={25}
          height={25}
          className="m-4"
        />
        <label className="ml-4 gap-2 mb-2 cursor-pointer font-bold">
          Sectors & Positions
        </label>
      </div>
    </Link>
  );
}
