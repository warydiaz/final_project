"use client";
import React, { FormEventHandler, useState, useEffect } from "react";
import DropDownSector from "./DropDownSector";
import DropDownHolidaysType from "./DropDownHolidaysType";
import DropDownDocumentType from "./DropDownDocumentType";
import {
  HolidaysType,
  Sector,
  DocumentType,
  Position,
} from "./types";
import DropDownPosition from "./DropDownPosition";
import {
  fetchSectors,
  fetchHolidaysType,
  fetchDocumetType,
  fetchPositions,
  fetchAEmployee,
  updateAEmployee,
} from "@/services/api";

interface UpdateEmployeeProps {
  onClose: () => void;
  onRefresh: () => void;
  employeeId: number;
}

export default function UpdateEmployee({
  onClose,
  onRefresh,
  employeeId,
}: UpdateEmployeeProps) {
  const [name, setName] = useState("");
  const [sector, setSector] = useState(0);
  const [positionName, setPositionName] = useState(0);
  const [documentType, setDocumentType] = useState(0);
  const [documentNumber, setDocumentNumber] = useState("");
  const [holidaysType, setHolidaysType] = useState(0);
  const [currentHoursOff, setCurrentHoursOff] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [dataSector, setDataSector] = useState<Sector[]>([]);
  const [dataPosition, setDataPosition] = useState<Position[]>([]);
  const [dataHolidaysType, setDataHolidaysType] = useState<HolidaysType[]>([]);
  const [dataDocumentType, setDataDocumentType] = useState<DocumentType[]>([]);

  useEffect(() => {
    fetchDataSector();
    fetchDataHolidaysType();
    fetchDataDocumetType();
    fetchDataPositions();
    fetchDataEmployee();
  }, []);

  const fetchDataSector = async () => {
    const jsonData = await fetchSectors();
    setDataSector(jsonData);
  };

  const fetchDataHolidaysType = async () => {
    const jsonData = await fetchHolidaysType();
    setDataHolidaysType(jsonData);
  };

  const fetchDataDocumetType = async () => {
    const jsonData = await fetchDocumetType();
    setDataDocumentType(jsonData);
  };

  const fetchDataPositions = async () => {
    const jsonData = await fetchPositions();
    setDataPosition(jsonData);
  };

  const fetchDataEmployee = async () => {
    const jsonData = await fetchAEmployee(employeeId);

    setName(jsonData.name);
    setSector(jsonData.employee_Sector);
    setPositionName(jsonData.position_name);
    setDocumentType(jsonData.document_type);
    setDocumentNumber(jsonData.document_number);
    setHolidaysType(jsonData.holidays_typeId);
    setEmail(jsonData.userid);
    setCurrentHoursOff(jsonData.current_hours_off);
  };

  const selectSector = (sector: Sector) => {
    setSector(sector.id);
  };

  const selectPosition = (position: Position) => {
    setPositionName(position.id);
  };

  const selectHolidaysType = (holidaysType: HolidaysType) => {
    setHolidaysType(holidaysType.id);
  };

  const selectDocumentType = (documentType: DocumentType) => {
    setDocumentType(documentType.id);
  };

  const updateEmployee = async () => {
    if (
      name.trim() === "" ||
      sector === 0 ||
      email.trim() === "" ||
      documentNumber.trim() === ""
    ) {
      setError(true);
      return;
    }

    const wasAdded = await updateAEmployee(
      employeeId,
      email,
      name,
      documentType,
      documentNumber,
      currentHoursOff,
      positionName,
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
  };

  const formSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-2xl">
        <h2 className="text-lg font-semibold mb-2">Update Employee</h2>

        {error && (
          <div className="text-red-600 font-bold">Error Updating Employee.</div>
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
            <DropDownSector
              data={dataSector}
              selectedId={sector}
              onSelect={selectSector}
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Position:</span>
            <DropDownPosition
              data={dataPosition}
              selectedId={positionName}
              onSelect={selectPosition}
            />
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
              selectedId={holidaysType}
              onSelect={selectHolidaysType}
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Hours Off:</span>
            <input
              type="number"
              value={currentHoursOff}
              className="border py-2 px-4"
              readOnly
            />
          </label>

          <label className="flex flex-col gap-2 mb-2">
            <span>Document Type:</span>
            <DropDownDocumentType
              data={dataDocumentType}
              selectedId={documentType}
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
              onClick={updateEmployee}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
