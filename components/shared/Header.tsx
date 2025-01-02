import Link from "next/link"
import {Button} from "@/components/ui/button"
import Navbar from "./Navbar"
import MobileNav from "./MobileNav"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"

const Header = async () => {
    
    
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
                <div>
                <SignedIn>
                    <SignOutButton redirectUrl="/">
                        <Button className="bg-primary-100 hover:bg-primary-200 rounded-full"> Sign out</Button>
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <Button className=" bg-primary-100 hover:bg-primary-200 rounded-full"> Sign in</Button>
                    </SignInButton>
                </SignedOut>
                </div>
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