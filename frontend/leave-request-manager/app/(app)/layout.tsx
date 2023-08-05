import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <LeftPanel />
      {children}
    </>
  );
}
