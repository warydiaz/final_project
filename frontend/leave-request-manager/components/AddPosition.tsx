"use client";
import axios from "axios";
import React, { FormEventHandler, useState } from "react";

interface AddPositionProps {
  onClose: () => void;
  onRefresh: () => void;
}

export default function AddPosition({ onClose, onRefresh }: AddPositionProps) {
  const [position, setPosition] = useState("");
  const [error, setError] = useState<boolean>(false);

  const addPosition = async () => {
    if (position.trim() === "") {
      setError(true);
      return;
    }

    try {
      const addPositionResponse = await axios.post(
        `http://localhost:3001/Position`,
        { "name": position }
      );
      const wasAdded: boolean = addPositionResponse.data.ok;

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
        <h2 className="text-lg font-semibold mb-2">Add a new Position</h2>

        {error && (
          <div className="text-red-600 font-bold">Error Adding a Position.</div>
        )}

        <form
          onSubmit={formSubmit}
          className="flex flex-col border p-4 rounded"
        >
          <label className="flex flex-col gap-2 mb-2">
            <span>Name:</span>
            <input
              type="string"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
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
              onClick={addPosition}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}