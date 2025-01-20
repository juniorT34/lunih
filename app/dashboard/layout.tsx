import type { Metadata } from "next";
import Sidebar from "@/components/shared/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User defined dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-primary-50 bg-dotted-pattern bg-cover bg-center`}
        suppressHydrationWarning
      >
        <div className="min-h-screen">
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
