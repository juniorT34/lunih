'use client'

import Link from 'next/link'
const links = [
  {
    'name':'Home',
    'path' : '/'
  },
  {
    'name':'About Us',
    'path' : '#about'
  },
  {
    'name':'Hub',
    'path' : '/Hub'
  },
  {
    'name':'Dashboard',
    'path' : '/Dashboard'
  },
]

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="text-lg font-bold">LUNIH</div>
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/hub">Hub</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li>
          <Link href="/login" className="px-4 py-2 text-white bg-green-600 rounded">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  )
}

