"use client";
import { updateAPosition } from "@/services/api";
import React, { FormEventHandler, useState } from "react";

interface UpdatePositionProps {
  onClose: () => void;
  onRefresh: () => void;
  positionId: number;
  name: string;
}

export default function UpdatePosition({
  onClose,
  onRefresh,
  positionId,
  name,
}: UpdatePositionProps) {
  const [position, setPosition] = useState(name);
  const [error, setError] = useState<boolean>(false);

  const updatePosition = async () => {
    if (position.trim() === "") {
      setError(true);
      return;
    }

    const wasUpdated = await updateAPosition(positionId, position);

    if (!wasUpdated) {
      setError(true);
    } else {
      setError(false);
      onClose();
      onRefresh();
    }
  };

  const formSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updatePosition();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-2xl">
        <h2 className="text-lg font-semibold mb-2">Update Position</h2>

        {error && (
          <div className="text-red-600 font-bold">Error Updating Position.</div>
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
              onClick={updatePosition}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
