"use client";
import React, { FormEventHandler, useState, useEffect } from "react";
import { fetchALeaveRequest, updateALeaveRequest } from "@/services/api";
import DropDownLeaveRequestStatus from "./DropDownLeaveRequestStatus";

interface updateLeaveRequestProps {
  onClose: () => void;
  onRefresh: () => void;
  id: number;
  isToApprove?: boolean;
}

export default function UpdateLeaveRequest({
  onClose,
  onRefresh,
  id,
  isToApprove,
}: updateLeaveRequestProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoursOffRequested, setHoursOffRequested] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const leaveRequest = await fetchALeaveRequest(id);

    if (!leaveRequest) {
      setError(true);
    } else {
      const start = leaveRequest.start_date.substring(0, 10);
      const end = leaveRequest.end_date.substring(0, 10);

      setStartDate(start);
      setEndDate(end);
      setHoursOffRequested(leaveRequest.hours_off_requested);
      setStatus(leaveRequest.status);
    }
  };

  const updateLeaveRequest = async () => {
    if (
      startDate.trim() === "" ||
      endDate.trim() === "" ||
      hoursOffRequested === 0 ||
      validateStartDate() ||
      validatEndDate()
    ) {
      setError(true);
      return;
    }

    const updated = await updateALeaveRequest(
      id,
      startDate,
      endDate,
      hoursOffRequested,
      status
    );

    if (!updated) {
      setError(true);
    } else {
      setError(false);
      onClose();
      onRefresh();
    }
  };

  const formSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const validateHours = (hours: string) => {
    setError(false);
    const hour = parseFloat(hours);
    if (hour >= 0) {
      setHoursOffRequested(parseFloat(hours));
    } else {
      setHoursOffRequested(0);
    }
  };

  const validateStartDate = (): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return true;
    } else {
      return false;
    }
  };

  const validatEndDate = (): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-2xl">
        <h2 className="text-lg font-semibold mb-2">Leave Request</h2>

        {error && (
          <div className="text-red-600 font-bold">
            Error updating a Leave Request.
          </div>
        )}

        <form
          onSubmit={formSubmit}
          className="flex flex-col border p-4 rounded"
        >
          <label className="flex flex-col gap-2 mb-2">
            <span>Start Date:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setError(false);
              }}
              className="border py-2 px-4"
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>End Date:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setError(false);
              }}
              className="border py-2 px-4"
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Hours:</span>
            <input
              type="number"
              value={hoursOffRequested}
              onChange={(e) => {
                validateHours(e.target.value);
              }}
              className="border py-2 px-4"
            />
          </label>

          {isToApprove && (
            <label className="flex flex-col gap-2 mb-2">
              <span>Status:</span>
              <DropDownLeaveRequestStatus
                leaveRequestStatusOld={status}
                onSelect={setStatus}
              />
            </label>
          )}
          <div className="flex justify-around">
            <button
              className="bg-stone-200 py-1 px-3 rounded"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-stone-200 py-1 px-3 rounded"
              onClick={updateLeaveRequest}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
