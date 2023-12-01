import axios from "axios";

const URL = "https://dummy.restapiexample.com/api/v1"

export const getAllEmployee = () => axios.get(`${URL}/employees`);

export const createEmployee = (data) => {
  return axios.post(`${URL}/create`, data);
};

export const updateEmployee = (id, data) => {
  return axios.put(`${URL}/update/${id}`, { data });
};

export const deleteEmployee = (id) => {
  return axios.delete(`${URL}/delete/${id}`);
};