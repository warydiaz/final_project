"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import Trash from "../app/icons/trash.svg";
import AddHolidaysType from "./AddHolidaysType";
import UpdateHolidaysType from "./UpdateHolidaysType";
import { HolidaysType } from "./types";
import { fetchHolidaysType, deleteAHolidayType } from "@/services/api";
import { isManager } from "@/services/api";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function HolidaysType() {
  const [data, setData] = useState<HolidaysType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [showPopupAddHolidaysType, setshowPopupAddHolidaysType] = useState(false);
  const [showPopupUpdateHolidaysType, setShowPopupUpdateHolidaysType] = useState(false);
  const [holidaysTypeId, setHolidaysTypeId] = useState(0);
  const [holidaysTypeCountry, setHolidaysTypeCountry] = useState("");
  const [amountOfDaysOff, setAmountOfDaysOff] = useState(0);
  const [nameOfHolidaysType, setNameOfHolidaysType] = useState("");
  const [manager, setManager] = useState(false);
  
  const supabase = createClientComponentClient();

  const openPopupAddHolidaysType = () => {
    setshowPopupAddHolidaysType(true);
  };

  const closePopupAddHolidaysType = () => {
    setshowPopupAddHolidaysType(false);
  };

  const openPopupUpdateHolidaysType = () => {
    setShowPopupUpdateHolidaysType(true);
  };

  const closePopupUpdateHolidaysType = () => {
    setShowPopupUpdateHolidaysType(false);
  };

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return data.user;
  };

  const fetchData = async () => {
    const userFetcData = await getUser();
    const fetchIsManager = await isManager(userFetcData.email);
    setManager(fetchIsManager);

    const jsonData = await fetchHolidaysType();
    setData(jsonData);
  };

  const deleteHolidayType = async (holidayTypeId: number) => {
    const wasDeleted = deleteAHolidayType(holidayTypeId);
    if (!wasDeleted) {
      setError(true);
    } else {
      setError(false);
      fetchData();
    }
  };

  return (
    <div className="flex flex-col ml-8 mr-8 w-10/12 ">
      <h1 className="text-2xl font-bold m-4">List of Holidays Types</h1>

      {manager && <button
        className="bg-lime-600 text-white py-1 px-3 rounded w-52"
        onClick={() => {
          openPopupAddHolidaysType();
        }}
      >
        Add
      </button>}

      {showPopupAddHolidaysType && (
        <AddHolidaysType
          onClose={closePopupAddHolidaysType}
          onRefresh={refreshData}
        />
      )}

      {showPopupUpdateHolidaysType && (
        <UpdateHolidaysType
          onClose={closePopupUpdateHolidaysType}
          onRefresh={refreshData}
          holidaysTypeId={holidaysTypeId}
          country={holidaysTypeCountry}
          daysOff={amountOfDaysOff}
          name={nameOfHolidaysType}
        />
      )}

      {error && (
        <div className="text-red-600 font-bold">
          Error deleting Holidays Type.
        </div>
      )}

      <div className="overflow-auto max-h80">
        <table className="table-auto w-full">
          <thead className="sticky top-0 bg-white">
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
                {manager && <td className="flex flex-row px-4 py-2 justify-center">
                  <div
                    className="m-4 cursor-pointer"
                    onClick={() => {
                      setHolidaysTypeId(item.id);
                      setHolidaysTypeCountry(item.country);
                      setAmountOfDaysOff(item.amount_of_days_off);
                      setNameOfHolidaysType(item.name);
                      openPopupUpdateHolidaysType();
                    }}
                  >
                    <Image src={Pencil} alt="Edit Icon" width={20} height={20} />
                  </div>
                  <div
                    className="m-4 cursor-pointer"
                    onClick={() => deleteHolidayType(item.id)}
                  >
                    <Image src={Trash} alt="Trash Icon" width={20} height={20} />
                  </div>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HolidaysType;
