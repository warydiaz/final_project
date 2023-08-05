import Link from "next/link";
export default function SectorLeftPanel() {
  return (
    <div className="flex flex-col border p-4 rounded">
      <Link href="/sector">
        <label className="flex flex-col gap-2 mb-2 cursor-pointer">
          Sectors
        </label>
      </Link>
    </div>
  );
}
