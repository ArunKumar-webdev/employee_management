"use client";
import React from "react";
import Form from "../../../components/Form";
import { useEmployeesStore } from '../../../store/Employee'

const EditEmployee = ({ emplyId }) => {
  const id = emplyId;
  const employees = useEmployeesStore((state) => state.employeeList)
  const isLoading = useEmployeesStore((state) => state.isLoading);
  const updateEmployee = useEmployeesStore((state) => state.updateEmployee)
  const setisEditOpen = useEmployeesStore((state) => state.setisEditOpen)
  const isError = useEmployeesStore((state) => state.error);
  const findData = employees.find((data => data.id == id));

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
};

export default EditEmployee;
