"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import Trash from "../app/icons/trash.svg";
import AddEmployee from "./AddEmployee";
import { Employee, Sector } from "./types";
import UpdateEmployee from "./UpdateEmployee";
import { fetchEmployees, fetchSectors, deleteAEmployee } from "@/services/api";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { isManager } from "@/services/api";

function Employee() {
  const [data, setData] = useState<Employee[]>([]);
  const [sectorData, setSectorData] = useState<Sector[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [showPopupAddEmployee, setshowPopupAddEmployee] = useState(false);
  const [showPopupUpdateEmployee, setshowPopupUpdateEmployee] = useState(false);
  const [employeeIdToUpdate, setEmployeeIdToUpdate] = useState(0);
  const [manager, setManager] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userFetcData = await getUser();
    const fetchIsManager = await isManager(userFetcData.email);
    setManager(fetchIsManager);

    await getSectors();
    await getEmployees();
  };

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return data.user;
  };

  const getEmployees = async () => {
    const jsonData = await fetchEmployees();
    setData(jsonData);
  };

  const getSectors = async () => {
    const jsonData = await fetchSectors();
    setSectorData(jsonData);
  };

  const getNameSector = (id: number): string => {
    const filtered = sectorData.find((aSector) => {
      if (aSector.id == id) {
        return aSector;
      }
    });

    return filtered!.name;
  };

  const deleteEmployee = async (employeeId: number) => {
    const wasDeleted = await deleteAEmployee(employeeId);

    if (!wasDeleted) {
      setError(true);
    } else {
      setError(false);
      fetchData();
    }
  };

  const closePopupUpdateEmployee = () => {
    setshowPopupUpdateEmployee(false);
  };

  const openPopupUpdateEmployee = () => {
    setshowPopupUpdateEmployee(true);
  };

  const openPopupAddEmployee = () => {
    setshowPopupAddEmployee(true);
  };

  const closePopupAddEmployee = () => {
    setshowPopupAddEmployee(false);
  };

  return (
    <div className="flex flex-col ml-8 mr-8 w-10/12 ">
      <h1 className="text-2xl font-bold m-4">List of Employees</h1>

      {manager && <button
        className="bg-lime-600 text-white py-1 px-3 rounded w-52"
        onClick={() => {
          openPopupAddEmployee();
        }}
      >
        Add
      </button>}

      {error && (
        <div className="text-red-600 font-bold">Error deleting Employee.</div>
      )}

      {showPopupAddEmployee && (
        <AddEmployee onClose={closePopupAddEmployee} onRefresh={fetchData} />
      )}

      {showPopupUpdateEmployee && (
        <UpdateEmployee
          onClose={closePopupUpdateEmployee}
          onRefresh={fetchData}
          employeeId={employeeIdToUpdate}
        />
      )}

      <div className="overflow-auto max-h80">
        <table className="table-auto w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Sector</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border text-center">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">
                  {getNameSector(item.employee_Sector)}
                </td>
                <td className="px-4 py-2">{item.userid}</td>
                {manager && <td
                  className="flex flex-row px-4 py-2 justify-center"
                  onClick={() => {
                    setEmployeeIdToUpdate(item.id);
                    openPopupUpdateEmployee();
                  }}
                >
                  <div className="m-4 cursor-pointer">
                    <Image src={Pencil} alt="Edit Icon" width={20} height={20} />
                  </div>
                </td>}
                {manager && <td>
                  <div
                    className="m-4 cursor-pointer"
                    onClick={() => deleteEmployee(item.id)}
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

export default Employee;
