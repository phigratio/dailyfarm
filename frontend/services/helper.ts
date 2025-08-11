import axios from "axios";

// The base URL for the Spring Boot backend
export const BASE_URL = "http://localhost:8080"; // Use production URL or local URL in development

// Axios instance for public requests (e.g., login, signup)
export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

// Axios instance for private requests (requires authentication)
export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT token to every private request
privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ensure this matches your login storage key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
