import { privateAxios } from "../services/helper";

// Check if the user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// Get current user details
export const getCurrentUserDetail = () => {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    return privateAxios
      .get(`/user/${userId}`)  // Endpoint to fetch user details from Spring Boot API
      .then((response) => response.data)
      .catch((error) => {
        console.error('Failed to fetch user details:', error);
        throw error;
      });
  }
  return null;
};

// Logout function
export const doLogout = (callback) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  callback();
};
