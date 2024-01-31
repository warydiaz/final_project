export const metadata = {
  title: "Vistagaming Intranet",
  description: "Vistagaming Intranet",
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
