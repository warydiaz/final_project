import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";
import Sector from "@/components/Sector_position";
export const metadata = {
  title: "Sector & Position",
  description: "Vistagaming Intranet",
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
        <Sector/>
      </div>
      {children}
    </>
  );
}
