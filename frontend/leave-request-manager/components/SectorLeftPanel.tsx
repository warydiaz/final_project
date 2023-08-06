import Link from "next/link";
export default function SectorLeftPanel() {
  return (
    <Link href="/sector">
      <div className="flex flex-col border p-4 rounded text-center m-4 hover:shadow-md">
        <label className="gap-2 mb-2 cursor-pointer font-bold">Sectors</label>
      </div>
    </Link>
  );
}
