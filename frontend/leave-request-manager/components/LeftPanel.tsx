"use client";
import { useEffect, useState } from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import EmployeeLeftPanel from "./EmployeeLeftPanel";
import MyTeamLeaveRequestLeftPanel from "./MyTeamleaveRequestLeftPanel";
import SectorLeftPanel from "./Sector_positionLeftPanel";
import HolidaysTypeLeftPanel from "./holidaysTypeLeftPanel";
import LeaveRequestLeftPanel from "./leaveRequestLeftPanel";
import { isManager } from "@/services/api";

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

  const fetchData = async () => {
    const userFetcData = await getUser();
    const fetchIsManager = await isManager(userFetcData.email);
  
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
