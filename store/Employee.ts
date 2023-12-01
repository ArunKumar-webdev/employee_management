import { create } from "zustand";
import { getAllEmployee, createEmployee, updateEmployee, deleteEmployee } from "../api/employee_api";

let cacheData: string;
if (typeof window !== "undefined") {
  cacheData = JSON.parse(localStorage.getItem("cachedData"));
}

interface EmployeesStore {
  employeeList: any;
  isLoading: boolean;
  error: string | null;

  createEmployee: (data: any) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
  updateEmployee: (id: number, data: any) => Promise<void>;
  getAllEmployee: () => Promise<void>;
  clearError: () => void;
}

export const useEmployeesStore = create<EmployeesStore>((set, get) => ({
  employeeList: cacheData ? cacheData : [],
  isLoading: false,
  error: null,

  createEmployee: async (data) => {
    try {
      set({ isLoading: true });
      const response = await createEmployee(data);
      const filteredData = get().employeeList;
      filteredData.push(response.data.data);
      set({ isLoading: false, employeeList: filteredData });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  deleteEmployee: async (id) => {
    try {
      set({ isLoading: true });
      await deleteEmployee(id);
      const filteredData = get().employeeList.filter(data => data.id !== id);
      localStorage.setItem('cachedData', JSON.stringify(filteredData))
      set({ isLoading: false, employeeList: filteredData });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  updateEmployee: async (id, data) => {
    try {
      set({ isLoading: true });
      const response = await updateEmployee(id, data);
      const responseData = response.data.data.data;
      const filteredData = get().employeeList.filter(data => data.id !== id);
      const updatedData = [...filteredData, responseData];
      const sortedData = updatedData.sort((a, b) => a.id - b.id);
      localStorage.setItem('cachedData', JSON.stringify(sortedData))
      set({ isLoading: false, employeeList: sortedData });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  getAllEmployee: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllEmployee();
      localStorage.setItem('cachedData', JSON.stringify(response.data.data))
      set({ isLoading: false, employeeList: response.data.data });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  clearError: () => set({ error: null })


}));