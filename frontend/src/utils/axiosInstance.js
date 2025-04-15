// frontend/src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // ✅ move this outside headers
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default axiosInstance;
