"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import Trash from "../app/icons/trash.svg";
import { LeaveRequest, Employee } from "./types";
import AddLeaveRequest from "./AddLeaveRequest";

function LeaveRequest() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [showPopupAddLeaveRequest, setshowPopupAddLeaveRequest] =
    useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<{ leaveRequest: LeaveRequest[] }>(
        `http://localhost:3001/leaveRequest`
      );
      const jsonData: LeaveRequest[] = response.data.leaveRequest;

      const jsonDataProceced = jsonData.map((item) => ({
        id: item.id,
        employeeId: item.employeeId,
        start_date: new Date(item.start_date).toLocaleDateString(),
        end_date: new Date(item.end_date).toLocaleDateString(),
        hours_off_requested: item.hours_off_requested,
        status: item.status,
      }));

      setData(jsonDataProceced);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openPopupAddLeaveRequest = () => {
    setshowPopupAddLeaveRequest(true);
  };

  const closePopupAddLeaveRequest = () => {
    setshowPopupAddLeaveRequest(false);
  };

  const deleteLeaveRequest = async (leaveRequestId: number) => {
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3001/leaveRequest/${leaveRequestId}`
      );
      const wasDeleted: boolean = deleteResponse.data;

      if (!wasDeleted) {
        setError(true);
      } else {
        setError(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col ml-8 mr-8 w-10/12 ">
      <h1 className="text-2xl font-bold m-4">List of Leave Request</h1>

      <button
        className="bg-stone-200 py-1 px-3 rounded w-52"
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
            <th className="px-4 py-2">Employee Id</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Hours off Requested</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border text-center">
              <td className="px-4 py-2">{item.employeeId}</td>
              <td className="px-4 py-2">{item.start_date}</td>
              <td className="px-4 py-2">{item.end_date}</td>
              <td className="px-4 py-2">{item.hours_off_requested}</td>
              <td className="px-4 py-2">{item.status}</td>
              <td className="flex flex-row px-4 py-2 justify-center">
                <div className="m-4 cursor-pointer">
                  <Image src={Pencil} alt="Edit Icon" width={20} height={20} />
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
