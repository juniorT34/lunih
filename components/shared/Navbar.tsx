'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constants'
import React from 'react'



const Navbar = () => {
    const pathname = usePathname()
  return (
    <nav className="flex items-center gap-8 mb-0">
        {navLinks.map((link) =>{
            return <Link key={link.name} href={link.path} className={`${pathname === link.path && "border-b-2 border-primary-100 text-black"} hover:text-secondary-100 capitalize transition-all font-medium`}>{link.name}</Link>
        })}
    </nav>
  )

}

export default Navbar