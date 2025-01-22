import type { Metadata } from "next";
import Sidebar from "@/components/shared/Sidebar";
import { currentUser} from "@clerk/nextjs/server";
import { UserButton} from "@clerk/nextjs";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User defined dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`antialiased bg-primary-50 bg-dotted-pattern bg-cover bg-center`}
        suppressHydrationWarning={true}
      >
        <div className="min-h-screen">
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8">
              <div className="flex justify-between items-center">
              <h1 className="mb-6">
                Logged in as{" "}
                <span className="text-xl font-bold">
                  {user?.firstName} {user?.lastName}
                </span>{" "}
                <span className="text-primary-100">
                  ({String(user?.unsafeMetadata.role)})
                </span>
              </h1>
                <UserButton />
              </div>
              {children}
              {/* <Footer /> */}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
