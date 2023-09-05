"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import Trash from "../app/icons/trash.svg";
import AddLeaveRequest from "./AddLeaveRequest";
import UpdateLeaveRequest from "./UpdateLeaveRequest";
import {
  fetchAEmployeeByUserId,
  fetchLeaveRequest,
  deleteALeaveRequest,
} from "@/services/api";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

function LeaveRequest() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [showPopupAddLeaveRequest, setshowPopupAddLeaveRequest] =
    useState(false);
  const [showPopupUpdateLeaveRequest, setshowPopupUpdateLeaveRequest] =
    useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState(0);
  const [leaveRequestId, setLeaveRequestId] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchData();
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    setUser(user);
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

  const fetchData = async () => {
    const userFetcData = await getUser();
    
    const useridFetcData = await getId(userFetcData.email);
 
    const jsonData = await fetchLeaveRequest(useridFetcData);

    const jsonDataProceced = jsonData.map((item) => ({
      id: item.id,
      employeeId: item.employeeId,
      start_date: new Date(item.start_date).toLocaleDateString(),
      end_date: new Date(item.end_date).toLocaleDateString(),
      hours_off_requested: item.hours_off_requested,
      status: item.status,
    }));

    setData(jsonDataProceced);
  };

  const openPopupAddLeaveRequest = () => {
    setshowPopupAddLeaveRequest(true);
  };

  const closePopupAddLeaveRequest = () => {
    setshowPopupAddLeaveRequest(false);
  };

  const closePopupUpdateLeaveRequest = () => {
    setshowPopupUpdateLeaveRequest(false);
  };

  const deleteLeaveRequest = async (leaveRequestId: number) => {
    const wasDeleted = await deleteALeaveRequest(leaveRequestId);

    if (!wasDeleted) {
      setError(true);
    } else {
      setError(false);
      fetchData();
    }
  };

  return (
    <div className="flex flex-col ml-8 mr-8 w-10/12 ">
      <h1 className="text-2xl font-bold m-4">My List of Leave Request</h1>

      <button
        className="bg-lime-600 text-white py-1 px-3 rounded w-52"
        onClick={() => {
          openPopupAddLeaveRequest();
          fetchData();
        }}
      >
        Add
      </button>

      {showPopupAddLeaveRequest && (
        <AddLeaveRequest
          onClose={closePopupAddLeaveRequest}
          onRefresh={fetchData}
          id={id}
        />
      )}

      {showPopupUpdateLeaveRequest && (
        <UpdateLeaveRequest
          onClose={closePopupUpdateLeaveRequest}
          onRefresh={fetchData}
          id={leaveRequestId}
        />
      )}

      {error && (
        <div className="text-red-600 font-bold">
          Error deleting Leave Request.
        </div>
      )}

      <table className="table-auto">
        <thead>
          <tr className="">
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Hours off Requested</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border text-center">
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
                <div
                  className="m-4 cursor-pointer"
                  onClick={() => deleteLeaveRequest(item.id)}
                >
                  <Image src={Trash} alt="Trash Icon" width={20} height={20} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequest;
