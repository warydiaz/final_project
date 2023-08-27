"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import Trash from "../app/icons/trash.svg";
import AddEmployee from "./AddEmployee";
import { Employee, Sector } from "./types";
import UpdateEmployee from "./UpdateEmployee";
//import Sector from "./Sector_position";

function Employee() {
  const [data, setData] = useState<Employee[]>([]);
  const [sectorData, setSectorData] = useState<Sector[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [showPopupAddEmployee, setshowPopupAddEmployee] = useState(false);
  const [showPopupUpdateEmployee, setshowPopupUpdateEmployee] = useState(false);
  const [employeeIdToUpdate, setEmployeeIdToUpdate] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getSectors();
    await getEmployees();
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get<{ employee: Employee[] }>(
        `http://localhost:3001/employee`
      );
      const jsonData: Employee[] = response.data.employee;
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSectors = async () => {
    try {
      const response = await axios.get<{ sector: Sector[] }>(
        `http://localhost:3001/sector`
      );
      const jsonData: Sector[] = response.data.sector;
      setSectorData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3001/employee/${employeeId}`
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

      <button
        className="bg-stone-200 py-1 px-3 rounded w-52"
        onClick={() => {
          openPopupAddEmployee();
        }}
      >
        Add
      </button>

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

      <table className="table-auto">
        <thead>
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
              <td
                className="flex flex-row px-4 py-2 justify-center"
                onClick={() => {
                  setEmployeeIdToUpdate(item.id);
                  openPopupUpdateEmployee();
                }}
              >
                <div className="m-4 cursor-pointer">
                  <Image src={Pencil} alt="Edit Icon" width={20} height={20} />
                </div>
                </td>
                <td>
                <div
                  className="m-4 cursor-pointer"
                  onClick={() => deleteEmployee(item.id)}
                >
                  <Image src={Trash} alt="Trash Icon" width={20} height={20} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
