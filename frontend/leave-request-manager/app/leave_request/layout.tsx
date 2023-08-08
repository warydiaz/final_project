import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";
import LeaveRequest from "@/components/leaveRequest";
export const metadata = {
  title: "Leave Request",
  description: "Vistagaming Leave Request Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <LeftPanel  />
        <LeaveRequest/>
      </div>
    </>
  );
}
