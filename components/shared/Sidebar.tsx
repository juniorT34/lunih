"use client"
import Link from 'next/link'
import { Layout,FileText,Check,ClockArrowUp,Merge, LogOut } from 'lucide-react'

import {SignOutButton } from "@clerk/nextjs"
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()
  const isActive = (path: string) =>{
    return pathname === path ? 'bg-primary-100 text-white' : 'text-gray-700 hover:bg-primary-100'
  }
  // console.log(pathname)
  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r">
      <nav className="p-4 space-y-2">
      <Link href={"/"}>
                <h1 className="text-2xl">LUN<span className="text-primary-100">IH</span></h1>
      </Link>
        <Link href="/dashboard" className={`flex items-center p-3 rounded-lg ${isActive('/dashboard')}`}>
          <Layout className="w-5 h-5 mr-3" />
          <span>Overview</span>
        </Link>
        <Link href="/dashboard/posts" className={`flex items-center p-3 rounded-lg ${isActive('/dashboard/posts')}`}>
          <FileText className="w-5 h-5 mr-3" />
          <span>Posts</span>
        </Link>
        <Link href="/dashboard/joined" className={`flex items-center p-3 rounded-lg ${isActive('/dashboard/joined')}`}>
          <Merge className="w-5 h-5 mr-3" />
          <span>joined</span>
        </Link>
        <Link href="/dashboard/pending" className={`flex items-center p-3 rounded-lg ${isActive('/dashboard/pending')}`}>
          <ClockArrowUp className="w-5 h-5 mr-3" />
          <span>Pending</span>
        </Link>
        <Link href="/dashboard/accepted" className={`flex items-center p-3 rounded-lg ${isActive('/dashboard/accepted')}`}>
          <Check className="w-5 h-5 mr-3" />
          <span>accepted</span>
        </Link>
        <SignOutButton redirectUrl="/">
        <div 
          className="mt-40 flex items-center p-3 text-gray-700 hover:bg-primary-100 rounded-lg"
          >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Sign Out</span>
        </div>
        </SignOutButton>
      </nav>
    </aside>
  )
}

export default Sidebar