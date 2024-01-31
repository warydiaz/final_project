import Employee from "@/components/Employee";
import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";
export const metadata = {
  title: "Employee",
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
        <LeftPanel />
        <Employee />
      </div>
      {children}
    </>
  );
}
