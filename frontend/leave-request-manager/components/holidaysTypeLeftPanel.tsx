import Link from "next/link";
export default function HolidaysTypeLeftPanel() {
  return (
    <Link href="/holidays_type">
      <div className="flex flex-col border p-4 rounded text-center m-4 hover:shadow-md">
        <label className="gap-2 mb-2 cursor-pointer font-bold">Holidays Type</label>
      </div>
    </Link>
  );
}
