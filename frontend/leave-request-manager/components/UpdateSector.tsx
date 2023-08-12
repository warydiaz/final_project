"use client";
import axios from "axios";
import React, { FormEventHandler, useState } from "react";

interface AddSectorProps {
  onClose: () => void;
  onRefresh: () => void;
  sectorId: number;
  name: string;
}

export default function UpdateSector({ onClose, onRefresh, sectorId, name}: AddSectorProps) {
  const [sector, setSector] = useState(name);
  const [error, setError] = useState<boolean>(false);

  const updateSector = async () => {
    if (sector.trim() === "") {
      setError(true);
      return;
    }

    try {
      const updatedSectorResponse = await axios.put(
        `http://localhost:3001/sector/${sectorId}`,
        { "name": sector }
      );
      const wasUpdated: boolean = updatedSectorResponse.data;
      
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
    updateSector();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-2xl">
        <h2 className="text-lg font-semibold mb-2">Update Sector</h2>

        {error && (
          <div className="text-red-600 font-bold">Error Updating Sector.</div>
        )}

        <form
          onSubmit={formSubmit}
          className="flex flex-col border p-4 rounded"
        >
          <label className="flex flex-col gap-2 mb-2">
            <span>Name:</span>
            <input
              type="string"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
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
              onClick={updateSector}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
