import SectorLeftPanel from "./SectorLeftPanel";

export default function LeftPanel() {
  return (
    <div className="flex-row px-3 py-4 border">
      <div className="font-bold"> Left Menu</div>
      <SectorLeftPanel />
      <div className="flex-1"></div>
    </div>
  );
}
