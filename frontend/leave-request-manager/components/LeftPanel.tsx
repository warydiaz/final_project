import EmployeeLeftPanel from "./EmployeeLeftPanel";
import SectorLeftPanel from "./Sector_positionLeftPanel";
import HolidaysTypeLeftPanel from "./holidaysTypeLeftPanel";
import LeaveRequestLeftPanel from "./leaveRequestLeftPanel"

export default function LeftPanel() {
  return (
    <div className="flex-row px-3 py-4 border-b border-r w-80 bg-gray-200">
      <SectorLeftPanel />
      <EmployeeLeftPanel />
      <HolidaysTypeLeftPanel />
      <LeaveRequestLeftPanel/>
    </div>
  );
}
