// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { publicAxios, privateAxios } from "../helper";

// Sign up
export const signUp = (user) => {
  return publicAxios
    .post(`/auth/register`, user)  // Updated endpoint for Spring Boot microservice
    .then((response) => response.data);
};

// Login
export const login = (loginDetail) => {
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
export const forgotPassword = (email) => {
  return publicAxios
    .post(`/auth/forgot-password?email=${encodeURIComponent(email)}`)  // Updated endpoint for Spring Boot microservice
    .then((response) => response.data)
    .catch((error) => {
      console.error('Forgot Password API Error:', error.response?.data || error.message);
      throw error;
    });
};

// Reset password
export const resetPassword = (email, otp, newPassword) => {
  return publicAxios
    .post("/auth/reset-password", { email, otp, newPassword })  // Updated endpoint for Spring Boot microservice
    .then(res => res.data)
    .catch(err => {
      console.error("Reset Password API Error:", err.response?.data || err.message);
      throw err;
    });
};
