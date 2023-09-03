import Link from "next/link";
import Image from "next/image";
import myTeamLeaveRequest from "../app/icons/my-team-leave-request-50.png";
export default function MyTeamLeaveRequestLeftPanel() {
  return (
    <Link href="/my_team_leave_request">
     <div className="flex items-center justify-start border p-4 rounded text-center m-4 hover:shadow-md">
      <Image
          src={myTeamLeaveRequest}
          alt="My Team Leave request Icon"
          width={25}
          height={25}
          className=" m-4 "
        />
        <label className="ml-2 cursor-pointer font-bold">My Team Leave Request</label>
      </div>
    </Link>
  );
}
