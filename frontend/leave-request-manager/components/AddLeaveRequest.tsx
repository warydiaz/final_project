"use client";
import React, { FormEventHandler, useState, useEffect } from "react";
import { AddALeaveRequest } from "../services/api";

interface AddLeaveRequestProps {
  onClose: () => void;
  onRefresh: () => void;
  id: number;
}

export default function AddLeaveRequest({
  onClose,
  onRefresh,
  id,
}: AddLeaveRequestProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoursOffRequested, setHoursOffRequested] = useState(0);
  const [error, setError] = useState<boolean>(false);

  const AddLeaveRequest = async () => {
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

    const wasAdded = await AddALeaveRequest(
      id,
      startDate,
      endDate,
      hoursOffRequested
    );

    if (!wasAdded) {
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

          <div className="flex justify-around">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-lime-600 text-white py-1 px-3 rounded"
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
