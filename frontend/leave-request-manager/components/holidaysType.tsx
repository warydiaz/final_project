"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import Trash from "../app/icons/trash.svg";

interface HolidaysType {
  id: number;
  name: string;
  amount_of_days_off: number;
  country: string;
  created_at: Date;
}

function HolidaysType() {
  const [data, setData] = useState<HolidaysType[]>([]);
  const [error, setError] = useState<boolean>(false); // Estado para controlar errores

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<{holidaysType: HolidaysType[]}>(
        `http://localhost:3001/holidaysType`
      );
      const jsonData: HolidaysType[] = response.data.holidaysType;
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const deleteHolidayType = async (holidayTypeId: number) => {
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3001/holidaysType/${holidayTypeId}`
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
    <div className="flex flex-col ml-8 mr-8 w-10/12 ">
      <h1 className="text-2xl font-bold m-4">List of Holidays Types</h1>

      {error && <div className="text-red-600 font-bold">Error deleting Holidays Type.</div>}

      <table className="table-auto">
        <thead>
          <tr className="">
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Amount of days off</th>
            <th className="px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border text-center">
              <td className="px-4 py-2">{item.country}</td>
              <td className="px-4 py-2">{item.amount_of_days_off}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="flex flex-row px-4 py-2 justify-center">
                  <div className="m-4 cursor-pointer">
                    <Image
                      src={Pencil}
                      alt="Edit Icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="m-4 cursor-pointer" onClick={() => deleteHolidayType(item.id)}>
                    <Image
                      src={Trash}
                      alt="Trash Icon"
                      width={20}
                      height={20}
                    />
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default HolidaysType;