import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";
import MyTeamLeaveRequest from "@/components/MyTeamLeaveRequest";
export const metadata = {
  title: "My Team Leave Request",
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
        <MyTeamLeaveRequest />
      </div>
      {children}
    </>
  );
}
