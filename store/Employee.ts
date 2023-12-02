import { create } from "zustand";
import { getAllEmployee } from "../api/employee_api";

let cacheData: string;
if (typeof window !== "undefined") {
  cacheData = JSON.parse(localStorage.getItem("cachedData"));
}

interface EmployeesStore {
  employeeList: any;
  isLoading: boolean;
  isEditOpen: boolean;
  error: string | null;
  createEmployee: (data: any) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
  updateEmployee: (id: number, data: any) => Promise<void>;
  getAllEmployee: () => Promise<void>;
  clearError: () => void;
  setisEditOpen: () => void;
}

const generateFakeSalaryAmount = () => {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return randomNumber.toString();
};

const generateFakeAge = () => {
  let randomNumber;
  do {
    randomNumber = Math.floor(19 + Math.random() * 81);
  } while (randomNumber < 19 || randomNumber > 99);
  return randomNumber.toString();
};

export const UseEmployeesStore = create<EmployeesStore>((set, get) => ({
  employeeList: cacheData ? cacheData : [],
  isLoading: false,
  error: null,
  isEditOpen: false,
  createEmployee: async (data) => {
    try {
      set({ isLoading: true });
      const filteredData = get().employeeList;
      data.id = filteredData[filteredData.length - 1].id + 1;
      filteredData.push(data);
      set({ isLoading: false, employeeList: filteredData });
    } catch (err) {
      set({ error: err?.response?.data?.message ? err?.response?.data?.message : 'Api Error', isLoading: false });
    }
  },

  deleteEmployee: async (id) => {
    try {
      set({ isLoading: true });
      const filteredData = get().employeeList.filter(data => data.id !== id);
      localStorage.setItem('cachedData', JSON.stringify(filteredData))
      set({ isLoading: false, employeeList: filteredData });
    } catch (err) {
      set({ error: err?.response?.data?.message ? err?.response?.data?.message : 'Api Error', isLoading: false });
    }
  },

  updateEmployee: async (id, data) => {
    try {
      set({ isLoading: true });
      const filteredData = get().employeeList.filter(data => data.id !== id);
      const updatedData = [...filteredData, data];
      const sortedData = updatedData.sort((a, b) => a.id - b.id);
      localStorage.setItem('cachedData', JSON.stringify(sortedData))
      set({ isLoading: false, employeeList: sortedData });
    } catch (err) {
      set({ error: err?.response?.data?.message ? err?.response?.data?.message : 'Api Error', isLoading: false });
    }
  },

  getAllEmployee: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllEmployee();
      let userData = response?.data?.data.map((obj) => ({
        ...obj,
        employee_name: `${obj.first_name} ${obj.last_name}`,
        employee_salary: generateFakeSalaryAmount(),
        employee_age: generateFakeAge()
      }));
      localStorage.setItem('cachedData', JSON.stringify(userData))
      set({ isLoading: false, employeeList: userData });
    } catch (err) {
      set({ error: err?.response?.data?.message ? err?.response?.data?.message : 'Api Error', isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  setisEditOpen: () => set({ isEditOpen: !get().isEditOpen })

}));