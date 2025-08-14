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

// Check if the user is logged in
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("token");
};

// Get current user details
export const getCurrentUserDetail = async () => {
  const userId = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token")||null; // Assuming token is stored under "token"

  if (userId && token) {
    try {
      const response = await privateAxios.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      throw error;
    }
  }
  return null;
};



// Update user details
export const updateUser = (user: any) => {
  return privateAxios
    .put("/users", user)  
    .then(response => response.data)
    .catch((err) => {
      console.error("Update Profile API Error:", err.response?.data || err.message);
      throw err;
    });
};

