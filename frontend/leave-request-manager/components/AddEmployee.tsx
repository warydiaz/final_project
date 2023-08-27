"use client";
import axios from "axios";
import React, { FormEventHandler, useState, useEffect } from "react";
import DropDownSector from "./DropDownSector";
import DropDownHolidaysType from "./DropDownHolidaysType";
import DropDownDocumentType from "./DropDownDocumentType";

import { HolidaysType, Sector, DocumentType } from "./types";

interface AddEmployeeProps {
  onClose: () => void;
  onRefresh: () => void;
}

export default function AddEmployee({ onClose, onRefresh }: AddEmployeeProps) {
  const [name, setName] = useState("");
  const [sector, setSector] = useState(0);
  const [positionName, setPositionName] = useState("");
  const [documentType, setDocumentType] = useState(0);
  const [documentNumber, setDocumentNumber] = useState("");
  const [holidaysType, setHolidaysType] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [dataSector, setDataSector] = useState<Sector[]>([]);
  const [dataHolidaysType, setDataHolidaysType] = useState<HolidaysType[]>([]);
  const [dataDocumentType, setDataDocumentType] = useState<DocumentType[]>([]);

  useEffect(() => {
    fetchDataSector();
    fetchDataHolidaysType();
    fetchDataDocumetType();
  }, []);

  const fetchDataSector = async () => {
    try {
      const response = await axios.get<{ sector: Sector[] }>(
        `http://localhost:3001/sector`
      );
      const jsonData: Sector[] = response.data.sector;
      setDataSector(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataHolidaysType = async () => {
    try {
      const response = await axios.get<{ holidaysType: HolidaysType[] }>(
        `http://localhost:3001/holidaysType`
      );
      const jsonData: HolidaysType[] = response.data.holidaysType;
      setDataHolidaysType(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataDocumetType = async () => {
    try {
      const response = await axios.get<{ documentType: DocumentType[] }>(
        `http://localhost:3001/documentType`
      );
      const jsonData: DocumentType[] = response.data.documentType;
      setDataDocumentType(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const selectSector = (sector: Sector) => {
    setSector(sector.id);
  };

  const selectHolidaysType = (holidaysType: HolidaysType) => {
    setHolidaysType(holidaysType.id);
  };

  const selectDocumentType = (documentType: DocumentType) => {
    setDocumentType(documentType.id);
  };

  const addEmployee = async () => {
    if (name.trim() === "" || sector === 0 || email.trim() === "" || documentNumber.trim() === "") {
      setError(true);
      return;
    }

    try {
      const addEmployeeResponse = await axios.post(
        `http://localhost:3001/employee`,
        {
          userid: email,
          name: name,
          document_type: documentType,
          document_number: documentNumber,
          current_hours_off: 0,
          position_name: positionName,
          holidays_typeId: holidaysType,
          employee_Sector: sector,
        }
      );
      const wasAdded: boolean = addEmployeeResponse.data.ok;

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
            <span>Position Name:</span>
            <input
              type="string"
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
              className="border py-2 px-4"
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
