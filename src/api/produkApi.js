import axios from "axios";

console.log("API Base URL:", import.meta.env.VITE_API_URL);
// Buat instance Axios
const api = axios.create({
    
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
