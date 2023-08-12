"use client";
import axios from "axios";
import React, { FormEventHandler, useState } from "react";

interface AddSectorProps {
  onClose: () => void;
  onRefresh: () => void;
}

export default function AddSector({ onClose, onRefresh }: AddSectorProps) {
  const [sector, setSector] = useState("");
  const [error, setError] = useState<boolean>(false);

  const addSector = async () => {
    try {
      const addSectorResponse = await axios.post(
        `http://localhost:3001/sector`,
        { name: sector }
      );
      const wasAdded: boolean = addSectorResponse.data.ok;

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
    addSector();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Add a new Sector</h2>
        {error && (
          <div className="text-red-600 font-bold">Error Adding a Sector.</div>
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
          <button
            className="bg-stone-200 py-1 px-3 rounded"
            onClick={addSector}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}