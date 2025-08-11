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
  const userId = localStorage.getItem("user_id");
  if (userId) {
    try {
      const response = await privateAxios.get(`/user/${userId}`);  // Endpoint to fetch user details from Spring Boot API
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      throw error;
    }
  }
  return null;
};

// Logout function
export const doLogout = (callback?: () => void) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  if (callback) callback();
};

// Sign up
export const signUp = (user: { email: string; password: string; fullname: string }) => {
  return publicAxios
    .post(`/auth/register`, user)  // Updated endpoint for Spring Boot microservice
    .then((response) => response.data);
};

// Login
export const login = (loginDetail: { email: string; password: string }) => {
  return publicAxios
    .post("/auth/login", loginDetail)  // Updated endpoint for Spring Boot microservice
    .then((response) => {
      // Save the token and user ID after successful login
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user.id); // Ensure this is returned by backend
      return response.data;
    });
};

// Forgot password
export const forgotPassword = (email: string) => {
  return publicAxios
    .post(`/auth/forgot-password?email=${encodeURIComponent(email)}`)  // Updated endpoint for Spring Boot microservice
    .then((response) => response.data)
    .catch((error) => {
      console.error('Forgot Password API Error:', error.response?.data || error.message);
      throw error;
    });
};

// Reset password
export const resetPassword = (email: string, otp: string, newPassword: string) => {
  return publicAxios
    .post("/auth/reset-password", { email, otp, newPassword })  // Updated endpoint for Spring Boot microservice
    .then((res) => res.data)
    .catch((err) => {
      console.error("Reset Password API Error:", err.response?.data || err.message);
      throw err;
    });
};

