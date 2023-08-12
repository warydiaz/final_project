"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import Trash from "../app/icons/trash.svg";
import AddSector from "./AddSector";
import UpdateSector from "./UpdateSector";

interface Sector {
  id: number;
  name: string;
  created_at: Date;
}

function Sector() {
  const [data, setData] = useState<Sector[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [showPopupAddSector, setshowPopupAddSector] = useState(false);
  const [showPopupUpdateSector, setshowPopupUpdateSector] = useState(false);
  const [sectorIdToUpdate, setsectorIdToUpdate] = useState(0);
  const [sectorNameToUpdate, setsectorNameToUpdate] = useState("");

  const openPopupAddSector = () => {
    setshowPopupAddSector(true);
  };

  const closePopupAddSector = () => {
    setshowPopupAddSector(false);
  };

  const refreshData = () => {
    fetchData();
  };

  const closePopupUpdateSector = () => {
    setshowPopupUpdateSector(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<{ sector: Sector[] }>(
        `http://localhost:3001/sector`
      );
      const jsonData: Sector[] = response.data.sector;
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteSection = async (sectionId: number) => {
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3001/sector/${sectionId}`
      );
      const wasDeleted: boolean = deleteResponse.data;

      if (!wasDeleted) {
        setError(true);
      } else {
        setError(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col ml-8 mr-8">
      <h1 className="text-2xl font-bold m-4">List of Sectors</h1>

      <button
        className="bg-stone-200 py-1 px-3 rounded w-52"
        onClick={() => {
          openPopupAddSector();
          refreshData();
        }}
      >
        Add
      </button>

      {showPopupAddSector && (
        <AddSector onClose={closePopupAddSector} onRefresh={refreshData} />
      )}
      {showPopupUpdateSector && (
        <UpdateSector
          onClose={closePopupUpdateSector}
          onRefresh={refreshData}
          sectorId={sectorIdToUpdate}
          name={sectorNameToUpdate}
        />
      )}

      {error && (
        <div className="text-red-600 font-bold">Error deleting section.</div>
      )}

      <ul>
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-row border p-2 rounded justify-center m-3"
          >
            <div className="grid items-center gap-2">
              <li>{item.name}</li>
            </div>
            <div className="flex flex-row px-4 py-2 justify-center">
              <div
                className="m-4 cursor-pointer"
                onClick={() => {
                  setsectorIdToUpdate(item.id);
                  setsectorNameToUpdate(item.name);
                  setshowPopupUpdateSector(true);
                }}
              >
                <Image src={Pencil} alt="Edit Icon" width={20} height={20} />
              </div>
              <div
                className="m-4 cursor-pointer"
                onClick={() => deleteSection(item.id)}
              >
                <Image src={Trash} alt="Trash Icon" width={20} height={20} />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sector;
