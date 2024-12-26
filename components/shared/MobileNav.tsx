"use client"
import {Sheet,SheetContent,SheetTrigger} from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import Link from "next/link"
// import { MdOutlineMenu } from "react-icons/md"
import {navLinks} from "@/constants"
import { Button } from "../ui/button"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { SignOutButton } from '@clerk/nextjs'

type Props = {}

const MobileNav = () => {
    const pathname = usePathname()

  return (
    <Sheet>
        <SheetTrigger className="flex justify-center items-center">
            <Menu className="text-[32px] text-black"/>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
            {/* logo */}
            <div className="mt-32 mb-10 text-2xl text-center">
                <Link href={"/"}>
                    <h1 className="text-4xl font-semibold">LUN<span className="text-primary-100">IH</span></h1>
                </Link>
            </div>
            <nav className="flex flex-col items-center gap-2">
                {navLinks.map((link) =>(
                    <Link href={link.path} key={link.name} className={`${pathname === link.path && "border-b-2 border-primary-100 text-black"} hover:text-secondary-100 capitalize transition-all font-medium`}>{link.name}</Link>
                ))}

                <SignedIn>
                    <SignOutButton redirectUrl="/">
                        <Button className="w-full bg-primary-100 hover:bg-primary-200 rounded-full"> Sign out</Button>
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <Button className=" bg-primary-100 hover:bg-primary-200 rounded-full"> Sign in</Button>
                    </SignInButton>
                </SignedOut>
            </nav>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNav