"use client";
import axios from "axios";
import React, { FormEventHandler, useState, useEffect } from "react";


interface AddLeaveRequestProps {
  onClose: () => void;
  onRefresh: () => void;
  id:number
}

export default function AddLeaveRequest({
  onClose,
  onRefresh,
  id
}: AddLeaveRequestProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoursOffRequested, setHoursOffRequested] = useState(0);
  const [error, setError] = useState<boolean>(false);

  const AddLeaveRequest = async () => {
    if (
      startDate.trim() === "" ||
      endDate.trim() === "" ||
      hoursOffRequested === 0
    ) {
      setError(true);
      return;
    }

    try {
      const addLeaveRequestResponse = await axios.post(
        `http://localhost:3001/leaveRequest`,
        {
          employeeId: id,
          startDate: startDate,
          endtDate: endDate,
          hours_off_requeted: hoursOffRequested,
          status: "Requested",
        }
      );
      const wasAdded: boolean = addLeaveRequestResponse.data.ok;

      if (!wasAdded) {
        setError(true);
      } else {
        setError(false);
        onClose();
        onRefresh();
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const formSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-2xl">
        <h2 className="text-lg font-semibold mb-2">Leave Request</h2>

        {error && (
          <div className="text-red-600 font-bold">
            Error creating a Leave Request.
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
              onChange={(e) => setStartDate(e.target.value)}
              className="border"
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>End Date:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border"
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Hours:</span>
            <input
              type="number"
              value={hoursOffRequested}
              onChange={(e) => setHoursOffRequested(parseFloat(e.target.value))}
              className="border"
            />
          </label>

          <div className="flex justify-around">
            <button
              className="bg-stone-200 py-1 px-3 rounded"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-stone-200 py-1 px-3 rounded"
              onClick={AddLeaveRequest}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}