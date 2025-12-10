import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL_LOCAL ? `${import.meta.env.VITE_API_URL_LOCAL}/api` : "http://localhost:5001/api",
  withCredentials: true,
});
