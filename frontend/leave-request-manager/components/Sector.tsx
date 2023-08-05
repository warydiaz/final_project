"use client";
import { useEffect, useState } from "react";
import axios from "axios";

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
        const response = await axios.get<Sector[]>(
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
      <h1 className="text-2xl font-bold">List of Sectors</h1>
      
        <ul>
          {data.map((item) => (
            <div className="flex flex-col border p-4 rounded">
            <label className="flex flex-col gap-2 mb-2">
              <li key={item.id}>
                <span>{item.name}</span>
              </li>
            </label>
            </div>
          ))}
        </ul>
      
    </div>
  );
}

export default Sector;
