export const signUp = (user, roleId) => {
  return publicAxios
    .post(`/auth/register?roleId=${roleId}`, user)  // Updated endpoint
    .then((response) => response.data);
};

export const login = (loginDetail) => {
  return publicAxios
    .post("/auth/login", loginDetail)  // Updated endpoint
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user.id);  // Ensure this matches the backend response
      return response.data;
    });
};
