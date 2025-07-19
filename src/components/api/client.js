import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  withCredentials: true, // Include cookies in requests
});

export default client;
