"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Pencil from "../app/icons/pencil.svg";
import Trash from "../app/icons/trash.svg";

interface Sector {
  id: number;
  name: string;
  created_at: Date;
}

function Sector() {
  const [data, setData] = useState<Sector[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<{Sector: Sector[]}>(
          `http://localhost:3001/sector`
        );
        const jsonData: Sector[] = response.data.Sector;
        setData(jsonData);
      } catch (error) {
        console.log(`${process.env.API_URL}/sector`);
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col ml-8 mr-8">
      <h1 className="text-2xl font-bold m-4">List of Holidays Type</h1>
  
      <ul>
        {data.map((item) => (
          <div key={item.id} className="flex flex-row border p-2 rounded justify-center m-3">
            <div className="grid items-center gap-2">
              <li>{item.name}</li>
            </div>
            <div className="flex flex-row px-4 py-2 justify-center">
              <div className="m-4 cursor-pointer">
                <Image src={Pencil} alt="Edit Icon" width={20} height={20} />
              </div>
              <div className="m-4 cursor-pointer">
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
