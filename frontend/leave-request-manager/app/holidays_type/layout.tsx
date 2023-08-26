import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";
import HolidaysType from "@/components/holidaysType";
export const metadata = {
  title: "Holidays Type",
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
        <HolidaysType/>
      </div>
      {children}
    </>
  );
}
