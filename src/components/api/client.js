import axios from "axios";

const backEndUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://vandhana-portal-backend.onrender.com";

const client = axios.create({
  baseURL: `${backEndUrl}/api/v1`,
  withCredentials: true, // Include cookies in requests
});

export default client;
