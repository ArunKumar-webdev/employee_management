"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UseEmployeesStore } from '../store/Employee'
import Table from './Table'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddEmployee from "../app/addemployee/page";
import EditEmployee from "../app/editemployee/[id]/page";
import { Button } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function EmployeeList() {
  const employees = UseEmployeesStore((state) => state.employeeList)
  const isLoading = UseEmployeesStore((state) => state.isLoading);
  const isEditOpen = UseEmployeesStore((state) => state.isEditOpen);
  const getAllEmployees = UseEmployeesStore((state) => state.getAllEmployee)
  const deleteEmployee = UseEmployeesStore((state) => state.deleteEmployee)
  const setisEditOpen = UseEmployeesStore((state) => state.setisEditOpen)
  const isError = UseEmployeesStore((state) => state.error);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [emplyId, setemplyId] = useState<number>();
  const clearError = UseEmployeesStore((state) => state.clearError);
  const [value, setValue] = useState(0);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const activeTab = localStorage.getItem('tab');
    const lang = localStorage.getItem('lang');
    if (activeTab) {
      setValue(activeTab ? Number(activeTab) : 0);
    }
    i18n.changeLanguage(lang);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    localStorage.setItem('tab', newValue.toString());
  };

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setemplyId(id);
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

  const handleEdit = (id: number) => {
    setemplyId(id);
    setisEditOpen();
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

  useEffect(() => { if (isEditOpen) setisEditOpen() }, [value])

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <div className='container mx-auto mt-10'>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={t("ViewEmployee")} {...a11yProps(0)} />
              <Tab label={t("EditEmployee")} {...a11yProps(1)} />
              <Tab label={t("AddEmployee")} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {isEditOpen && emplyId ? <EditEmployee emplyId={emplyId} /> :
              <Table isError={isError} isLoading={isLoading} employees={employees} handleEdit={handleEdit} handleDelete={handleClickOpen} action={value} />
            }
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {isEditOpen && emplyId ? <EditEmployee emplyId={emplyId} /> :
              <Table isError={isError} isLoading={isLoading} employees={employees} handleEdit={handleEdit} handleDelete={handleClickOpen} action={value} />
            }
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AddEmployee />
          </CustomTabPanel>
        </Box>
      </div>
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
    </>
  )
}

