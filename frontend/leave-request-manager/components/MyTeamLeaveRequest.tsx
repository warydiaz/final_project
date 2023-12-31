"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import UpdateLeaveRequest from "./UpdateLeaveRequest";
import {
  fetchAEmployeeByUserId,
  fetchLeaveRequestByManager,
} from "@/services/api";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

function MyTeamLeaveRequest() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [showPopupUpdateLeaveRequest, setshowPopupUpdateLeaveRequest] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState(0);
  const [leaveRequestId, setLeaveRequestId] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchData();
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    setUser(data.user);
    return data.user;
  };

  const getId = async (userId: string): Promise<number | undefined> => {
    const exist = await fetchAEmployeeByUserId(userId);

    if (!exist) {
      setError(true);
    } else {
      setError(false);
      setId(exist.id);
      return exist.id;
    }
  };

  const fetchData = async (status?: string[]) => {
    const userFetcData = await getUser();
    const useridFetcData = await getId(userFetcData.email);

    if (!status) {
      status = ["Requested"];
    }

    const jsonData = await fetchLeaveRequestByManager(useridFetcData, [status]);

    if (jsonData) {
      const jsonDataProceced = jsonData.map((item) => ({
        id: item.id,
        employeeId: item.employeeId,
        name: item.name,
        start_date: new Date(item.start_date).toLocaleDateString(),
        end_date: new Date(item.end_date).toLocaleDateString(),
        hours_off_requested: item.hours_off_requested,
        status: item.status,
      }));

      setData(jsonDataProceced);
    } else {
      setData([]);
    }
  };

  const closePopupUpdateLeaveRequest = () => {
    setshowPopupUpdateLeaveRequest(false);
  };

  return (
    <div className="flex flex-col ml-8 mr-8 w-10/12">
      <h1 className="text-2xl font-bold m-4">
        List of Leave Request of My Team
      </h1>

      <div className="flex">
        <div
          className="flex-1 items-center justify-start border p-4 rounded text-center m-4 hover:shadow-md cursor-pointer"
          onClick={() => fetchData()}
        >
          <label className="ml-2 font-bold">Requested</label>
        </div>
        <div
          className="flex-1 items-center justify-start border p-4 rounded text-center m-4 hover:shadow-md cursor-pointer"
          onClick={() => fetchData(["Approved", "Rejected"])}
        >
          <label className="ml-2 font-bold">History</label>
        </div>
      </div>

      {error && (
        <div className="text-red-600 font-bold">Error trying to get data.</div>
      )}

      {showPopupUpdateLeaveRequest && (
        <UpdateLeaveRequest
          onClose={closePopupUpdateLeaveRequest}
          onRefresh={fetchData}
          id={leaveRequestId}
          isToApprove={true}
        />
      )}

      <div className="overflow-auto max-h80">
        <table className="table-auto w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Hours off Requested</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border text-center">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.start_date}</td>
                <td className="px-4 py-2">{item.end_date}</td>
                <td className="px-4 py-2">{item.hours_off_requested}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="flex flex-row px-4 py-2 justify-center">
                  <div className="m-4 cursor-pointer">
                    <Image
                      src={Pencil}
                      alt="Edit Icon"
                      width={20}
                      height={20}
                      onClick={() => {
                        setshowPopupUpdateLeaveRequest(true);
                        setLeaveRequestId(item.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyTeamLeaveRequest;
