"use client";
import axios from "axios";
import React, { FormEventHandler, useState } from "react";

interface AddSectorProps {
  onClose: () => void;
  onRefresh: () => void;
}

export default function AddHolidaysType({
  onClose,
  onRefresh,
}: AddSectorProps) {
  const [country, setCountry] = useState("");
  const [amountOfDaysOff, setAmountOfDaysOff] = useState(0);
  const [nameOfTypeDaysOff, setNameOfTypeDaysOff] = useState("");

  const [error, setError] = useState<boolean>(false);

  const addHolidaysType = async () => {
    if (country.trim() === "") {
      setError(true);
      return;
    }

    if (amountOfDaysOff === 0) {
      setError(true);
      return;
    }

    if (nameOfTypeDaysOff.trim() === "") {
      setError(true);
      return;
    }

    try {
      const addHolidaysTypeResponse = await axios.post(
        `http://localhost:3001/holidaysType`,
        {
          country: country,
          amount_of_days_off: amountOfDaysOff,
          name: nameOfTypeDaysOff,
        }
      );
      const wasAdded: boolean = addHolidaysTypeResponse.data.ok;

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
    addHolidaysType();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-2xl">
        <h2 className="text-lg font-semibold mb-2">Add a Holidays Type</h2>

        {error && (
          <div className="text-red-600 font-bold">Error Adding a Holidays Type.</div>
        )}

        <form
          onSubmit={formSubmit}
          className="flex flex-col border p-4 rounded"
        >
          <label className="flex flex-col gap-2 mb-2">
            <span>Country:</span>
            <input
              type="string"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border"
            />
          </label>
          <label className="flex flex-col gap-2 mb-2">
            <span>Amount of days off:</span>
            <input
              type="number"
              value={amountOfDaysOff}
              onChange={(e) => setAmountOfDaysOff(parseInt(e.target.value))}
              className="border"
            />
          </label>
          <label className="flex flex-col gap-2 mb-2">
            <span>Name of type:</span>
            <input
              type="string"
              value={nameOfTypeDaysOff}
              onChange={(e) => setNameOfTypeDaysOff(e.target.value)}
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
              onClick={addHolidaysType}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
