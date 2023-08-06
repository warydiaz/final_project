
import EmployeeLeftPanel from "./EmployeeLeftPanel";
import SectorLeftPanel from "./SectorLeftPanel";

export default function LeftPanel() {
  return (
<div className="flex-row px-3 py-4 border-b border-r w-80">
      <div className="font-bold">Left Menu</div>
      <SectorLeftPanel />
      <EmployeeLeftPanel/>
    </div>
  );
}
