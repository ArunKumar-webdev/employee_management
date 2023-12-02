"use client"
import React from "react";
import Form from "../../components/Form";

import { UseEmployeesStore } from "../../store/Employee"
const AddEmployee = () => {
  const createEmployee = UseEmployeesStore((state) => state.createEmployee);
  const isError = UseEmployeesStore((state) => state.error);
  return (
    <Form isError={isError} type="Add" createEmployee={createEmployee} />
  )
}

export default AddEmployee
