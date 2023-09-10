"use client";
import { useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import EmployeeLeftPanel from "./EmployeeLeftPanel";
import MyTeamLeaveRequestLeftPanel from "./MyTeamleaveRequestLeftPanel";
import SectorLeftPanel from "./Sector_positionLeftPanel";
import HolidaysTypeLeftPanel from "./holidaysTypeLeftPanel";
import LeaveRequestLeftPanel from "./leaveRequestLeftPanel";
import { isManager, fetchAEmployeeByUserId } from "@/services/api";

export default function LeftPanel() {
  const [manager, setManager] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchData();
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return data.user;
  };

  const getId = async (userId: string): Promise<number> => {
    const exist = await fetchAEmployeeByUserId(userId);

    return exist.id;
  };

  const fetchData = async () => {
    const userFetcData = await getUser();
    const useridFetcData = await getId(userFetcData.email);
    const fetchIsManager = await isManager(useridFetcData);
  
    setManager(fetchIsManager);
  };

  return (
    <div className="flex-row px-3 py-4 border-b border-r w-80 bg-gray-200">
      <SectorLeftPanel />
      <EmployeeLeftPanel />
      <HolidaysTypeLeftPanel />
      <LeaveRequestLeftPanel />
      {manager && <MyTeamLeaveRequestLeftPanel />}
    </div>
  );
}
