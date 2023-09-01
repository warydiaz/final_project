"use client";
import React, { FormEventHandler, useState } from "react";
import { addAHolidaysType } from "../services/api";

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
    if (
      country.trim() === "" ||
      nameOfTypeDaysOff.trim() === "" ||
      nameOfTypeDaysOff.trim() === ""
    ) {
      setError(true);
      return;
    }
    const wasAdded = await addAHolidaysType(
      country,
      amountOfDaysOff,
      nameOfTypeDaysOff
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-2xl">
        <h2 className="text-lg font-semibold mb-2">Add a Holidays Type</h2>

        {error && (
          <div className="text-red-600 font-bold">
            Error Adding a Holidays Type.
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
              value={nameOfTypeDaysOff}
              onChange={(e) => setNameOfTypeDaysOff(e.target.value)}
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
