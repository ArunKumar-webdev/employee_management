"use client";
import React from "react";
import EmployeeList from "../components/EmployeeList";
import { useTranslation, I18nextProvider } from 'react-i18next';
import { i18nInit } from "../components/i18n";

export default function Home() {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18nInit}>
      <EmployeeList />
    </I18nextProvider>
  )
}
