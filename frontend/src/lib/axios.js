import axios from "axios";

// Get backend URL from environment variable or use defaults
const getBackendURL = () => {
  // In development, use localhost
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5001/api";
  }
  
  // In production, check for VITE_BACKEND_URL environment variable
  // If not set, assume backend is on same domain (for monorepo deployments)
  return import.meta.env.VITE_BACKEND_URL 
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : "/api";
};

export const axiosInstance = axios.create({
  baseURL: getBackendURL(),
  withCredentials: true,
  timeout: 10000, // 10 second timeout to prevent hanging
});
