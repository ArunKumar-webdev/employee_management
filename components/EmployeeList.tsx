"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEmployeesStore } from '../store/Employee'
import Table from './Table'
import { IoAddCircle } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

export default function EmployeeList() {
  const employees = useEmployeesStore((state) => state.employeeList)
  const isLoading = useEmployeesStore((state) => state.isLoading);
  const getAllEmployees = useEmployeesStore((state) => state.getAllEmployee)
  const deleteEmployee = useEmployeesStore((state) => state.deleteEmployee)
  const isError = useEmployeesStore((state) => state.error);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [emplyId, setemplyId] = useState();
  const clearError = useEmployeesStore((state) => state.clearError);

  const handleClickOpen = (id) => {
    setOpen(true);
    setemplyId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('cachedData');
        if (cachedData == undefined || null) {
          await getAllEmployees();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isError?.length > 0) {
      alert(isError)
      clearError();
    }
  }, [isError])

  const handleEdit = (id) => {
    router.push(`/editemployee/${id}`);
  };

  async function handleDelete() {
    try {
      setOpen(false);
      await deleteEmployee(emplyId);
      router.refresh();
    } catch (error) {
      console.error(error);
      router.refresh();
    }
  };

  return (
    <div>
      <div className='container mx-auto mt-10'>
        {!isLoading && <div className="mb-2">{'Employees List :'}</div>}
        <Table isError={isError} isLoading={isLoading} employees={employees && employees} handleEdit={handleEdit} handleDelete={handleClickOpen} />
      </div>
      <IoAddCircle onClick={() => { router.push('/addemployee') }} className="fixed bottom-8 right-8 text-6xl text-[#1976d2] cursor-pointer" />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure delete this employee data ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleDelete()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

