import Link from "next/link";
import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-[#1976d2] px-8 py-4">
      <Link className="text-white text-2xl inter" href={'/'}>{'Employee Management Portal'}</Link>
    </nav>
  )
}
