export const metadata = {
  title: "Leave Request Manager",
  description: "Vistagaming Leave Request Manager",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
