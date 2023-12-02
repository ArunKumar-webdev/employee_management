"use client";
import React from "react";
import Form from "../../../components/Form";
import { UseEmployeesStore } from '../../../store/Employee'

interface EditEmployeeProps {
  emplyId: number
}

export default function pagEditEmployeee({ emplyId }: EditEmployeeProps) {
  const employees = UseEmployeesStore((state) => state.employeeList)
  const isLoading = UseEmployeesStore((state) => state.isLoading);
  const updateEmployee = UseEmployeesStore((state) => state.updateEmployee)
  const setisEditOpen = UseEmployeesStore((state) => state.setisEditOpen)
  const isError = UseEmployeesStore((state) => state.error);
  const findData = employees.find((data => data.id == emplyId));
  return (
    <Form
      type="Edit"
      findData={findData}
      isLoading={isLoading}
      updateEmployee={updateEmployee}
      isError={isError}
      setisEditOpen={setisEditOpen}
    />
  );
}
