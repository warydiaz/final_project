import Link from "next/link";
import Image from "next/image";
import leaveRequest from "../app/icons/leave-request-50.png";
export default function LeaveRequestLeftPanel() {
  return (
    <Link href="/leave_request">
     <div className="flex items-center justify-start border p-4 rounded text-center m-4 hover:shadow-md">
      <Image
          src={leaveRequest}
          alt="Leave request Icon"
          width={25}
          height={25}
          className=" m-4 "
        />
        <label className="gap-2 mb-2 cursor-pointer font-bold">Leave Request</label>
      </div>
    </Link>
  );
}
