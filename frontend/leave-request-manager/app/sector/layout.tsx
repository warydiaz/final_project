import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";
import Sector from "@/components/Sector";
export const metadata = {
  title: "Section",
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
      
      <div className="flex">
        <LeftPanel  />
        <Sector/>
      </div>
    </>
  );
}
