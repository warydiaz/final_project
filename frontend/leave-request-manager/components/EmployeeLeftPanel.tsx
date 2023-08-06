import Link from "next/link";
export default function SectorLeftPanel() {
  return (
    <Link href="/employee">
      <div className="flex flex-col border p-4 rounded text-center m-4">
        <label className="gap-2 mb-2 cursor-pointer font-bold">Employees</label>
      </div>
    </Link>
  );
}
