"use client";
import Link from "next/link";
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaLanguage } from "react-icons/fa6";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  return (
    <nav className="flex justify-between items-center bg-[#1976d2] px-8 py-4">
      <Link className="text-white text-2xl inter" href={'/'}>{t('EmployeeManagementPortal')}</Link>
      <div className="flex items-center">
        <FaLanguage className="text-2xl" />
        <button onClick={() => { i18n.changeLanguage('en'); localStorage.setItem('lang', 'en'); }} className="text-white text-base bg-black mx-2 inter p-2 rounded-sm">English</button>
        <button onClick={() => { i18n.changeLanguage('fr'); localStorage.setItem('lang', 'fr'); }} className="text-white text-base bg-black mx-2 inter p-2 rounded-sm">French</button>
      </div>
    </nav>
  )
}
