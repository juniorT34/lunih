import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import Navbar from "@/components/shared/Navbar"


export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

