"use client";
import axios from "axios";
import React, { FormEventHandler, useState } from "react";

interface UpdateHolidaysTypeProps {
  onClose: () => void;
  onRefresh: () => void;
  holidaysTypeId: number;
  country: string;
  daysOff: number;
  name: string;
}

export default function UpdateHolidaysType({
  onClose,
  onRefresh,
  holidaysTypeId,
  country,
  daysOff,
  name,
}: UpdateHolidaysTypeProps) {
  const [holidaysTypeCountry, setHolidaysTypeCountry] = useState(country);
  const [amountOfDaysOff, setAmountOfDaysOff] = useState(daysOff);
  const [nametOfDaysOff, setNamefDaysOff] = useState(name);
  const [error, setError] = useState<boolean>(false);

  const updateHolidaysType = async () => {
    if (holidaysTypeCountry.trim() === "") {
      setError(true);
      return;
    }

    if (amountOfDaysOff === 0) {
      setError(true);
      return;
    }

    if (nametOfDaysOff.trim() === "") {
      setError(true);
      return;
    }
    try {
      const updatedHolidaysTypeResponse = await axios.put(
        `http://localhost:3001/HolidaysType/${holidaysTypeId}`,
        {
          "country": holidaysTypeCountry,
          "amount_of_days_off": amountOfDaysOff,
          "name": nametOfDaysOff,
        }
      );
      const wasUpdated: boolean = updatedHolidaysTypeResponse.data;

      if (!wasUpdated) {
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
    updateHolidaysType();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-2xl">
        <h2 className="text-lg font-semibold mb-2">Update Holidays Type</h2>

        {error && (
          <div className="text-red-600 font-bold">
            Error Updating Holidays Type.
          </div>
        )}

        <form
          onSubmit={formSubmit}
          className="flex flex-col border p-4 rounded"
        >
          <label className="flex flex-col gap-2 mb-2">
            <span>Country:</span>
            <input
              type="string"
              value={holidaysTypeCountry}
              onChange={(e) => setHolidaysTypeCountry(e.target.value)}
              className="border py-2 px-4"
            />
          </label>
          <label className="flex flex-col gap-2 mb-2">
            <span>Amount of days off:</span>
            <input
              type="number"
              value={amountOfDaysOff}
              onChange={(e) => setAmountOfDaysOff(parseInt(e.target.value))}
              className="border py-2 px-4"
            />
          </label>
          <label className="flex flex-col gap-2 mb-2">
            <span>Name of type:</span>
            <input
              type="string"
              value={nametOfDaysOff}
              onChange={(e) => setNamefDaysOff(e.target.value)}
              className="border py-2 px-4"
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
              onClick={updateHolidaysType}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
