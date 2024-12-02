import Link from "next/link"
import {Button} from "@/components/ui/button"
import Navbar from "./Navbar"
import MobileNav from "./MobileNav"
import {auth,currentUser} from '@clerk/nextjs/server'
type Props = {}

const Header = async () => {
    const {userId} = await auth()
    console.log(userId)
    
  return (
    <header className="py-2 xl:py-4 px-10 bg-slate-100 shadow-md">

        <div className="container mx-auto flex justify-between items-center">
            {/* logo */}
            <Link href={"/"}>
                <h1 className="text-2xl">LUN<span className="text-primary-100">IH</span></h1>
            </Link>
            {/* desktop navigation */}
            <div className="hidden xl:flex items-center gap-8">
                <Navbar />
                <Link href={"/sign-in"}>
                    <Button className="bg-primary-100 hover:bg-primary-200 rounded-full">Sign In</Button>
                </Link>
            </div>
            {/* mobile nav */}
            <div className="xl:hidden">
                <MobileNav />
            </div>
        </div>
    </header>
  )
}

export default Header