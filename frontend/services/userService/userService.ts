
import { privateAxios, publicAxios } from "../axiosConfig";

export const userService = {
  // Fetch all users (requires authentication)
  getAllUsers: async () => {
    const response = await privateAxios.get("/users");
    return response.data;
  },

  // Fetch user by ID (requires authentication)
  getUserById: async (userId: string) => {
    const response = await privateAxios.get(`/users/${userId}`);
    return response.data;
  },

  // Search users by username (doesn't require authentication)
  searchUsers: async (username: string) => {
    const response = await publicAxios.get("/users/search", {
      params: { username },
    });
    return response.data;
  },
};
