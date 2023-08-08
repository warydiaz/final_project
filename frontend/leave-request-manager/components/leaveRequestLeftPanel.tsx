import Link from "next/link";
export default function LeaveRequestLeftPanel() {
  return (
    <Link href="/leave_request">
      <div className="flex flex-col border p-4 rounded text-center m-4 hover:shadow-md">
        <label className="gap-2 mb-2 cursor-pointer font-bold">Leave Request</label>
      </div>
    </Link>
  );
}
