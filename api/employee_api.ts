import axios from "axios";

const URL = "https://reqres.in/api/users"

export const getAllEmployee = () => axios.get(`${URL}`);