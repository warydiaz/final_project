"use client";
import React, { FormEventHandler, useState, useEffect } from "react";
import DropDownSector from "./DropDownSector";
import DropDownHolidaysType from "./DropDownHolidaysType";
import DropDownDocumentType from "./DropDownDocumentType";
import { HolidaysType, Sector, DocumentType, Position } from "./types";
import {
  fetchSectors,
  fetchPositions,
  fetchHolidaysType,
  fetchDocumetType,
  addAEmployee,
} from "../services/api";

interface AddEmployeeProps {
  onClose: () => void;
  onRefresh: () => void;
}

export default function AddEmployee({ onClose, onRefresh }: AddEmployeeProps) {
  const [name, setName] = useState("");
  const [sector, setSector] = useState(0);
  const [position, setPosition] = useState(0);
  const [documentType, setDocumentType] = useState(0);
  const [documentNumber, setDocumentNumber] = useState("");
  const [holidaysType, setHolidaysType] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [dataSector, setDataSector] = useState<Sector[]>([]);
  const [dataPosition, setDataPosition] = useState<Sector[]>([]);
  const [dataHolidaysType, setDataHolidaysType] = useState<HolidaysType[]>([]);
  const [dataDocumentType, setDataDocumentType] = useState<DocumentType[]>([]);

  useEffect(() => {
    fetchDataSector();
    fetchDataHolidaysType();
    fetchDataDocumetType();
    fetchDataPosition();
  }, []);

  const fetchDataSector = async () => {
    const jsonData = await fetchSectors();
    setDataSector(jsonData);
  };

  const fetchDataPosition = async () => {
    const jsonData: Position[] = await fetchPositions();
    setDataPosition(jsonData);
  };

  const fetchDataHolidaysType = async () => {
    const jsonData = await fetchHolidaysType();
    setDataHolidaysType(jsonData);
  };

  const fetchDataDocumetType = async () => {
    const jsonData = await fetchDocumetType();
    setDataDocumentType(jsonData);
  };

  const selectSector = (sector: Sector) => {
    setSector(sector.id);
  };

  const selectPosition = (position: Position) => {
    setPosition(position.id);
  };

  const selectHolidaysType = (holidaysType: HolidaysType) => {
    setHolidaysType(holidaysType.id);
  };

  const selectDocumentType = (documentType: DocumentType) => {
    setDocumentType(documentType.id);
  };

  const addEmployee = async () => {
    if (
      name.trim() === "" ||
      sector === 0 ||
      email.trim() === "" ||
      documentNumber.trim() === ""
    ) {
      setError(true);
      return;
    }

    try {
      const wasAdded: boolean = await addAEmployee(
        email,
        name,
        documentType,
        documentNumber,
        position,
        holidaysType,
        sector
      );

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
        <h2 className="text-lg font-semibold mb-2">Add an Employee</h2>

        {error && (
          <div className="text-red-600 font-bold">
            Error Adding an Employee.
          </div>
        )}

        <form
          onSubmit={formSubmit}
          className="flex flex-col border p-4 rounded"
        >
          <label className="flex flex-col gap-2 mb-2">
            <span>Name:</span>
            <input
              type="string"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border py-2 px-4"
            />
          </label>
          <label className="flex flex-col gap-2 mb-2">
            <span>Sector:</span>
            <DropDownSector data={dataSector} onSelect={selectSector} />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Position:</span>
            <DropDownSector data={dataPosition} onSelect={selectPosition} />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Email:</span>
            <input
              type="string"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border py-2 px-4"
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Holidays Type:</span>
            <DropDownHolidaysType
              data={dataHolidaysType}
              onSelect={selectHolidaysType}
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Document Type:</span>
            <DropDownDocumentType
              data={dataDocumentType}
              onSelect={selectDocumentType}
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Document Number:</span>
            <input
              type="string"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
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
              onClick={addEmployee}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
