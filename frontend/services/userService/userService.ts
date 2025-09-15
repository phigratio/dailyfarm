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


export const generateGeminiContent = async (textPrompt: string): Promise<string> => {
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: textPrompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await privateAxios.post("users/api/gemini/generate", requestBody);

    const responseStr =
      typeof response.data === "string" ? response.data : JSON.stringify(response.data);

    const match = responseStr.match(/"parts"\s*:\s*\[\s*\{\s*"text"\s*:\s*"([\s\S]*?)"\s*\}\s*\]/);

    if (match && match[1]) {
      return match[1].replace(/\\n/g, "\n");
    }

    return responseStr;
  } catch (error) {
    console.error("Gemini API generation error:", error);
    throw error;
  }
};








export const createFarm = async (farmPayload: any) => {
  try {
    const response = await privateAxios.post("/farms", farmPayload);
    if (response.status === 201 || response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to create farm, status code: ${response.status}`);
    }
  } catch (error: any) {
    console.error("Create Farm API error:", error.response?.data || error.message);
    throw error;
  }
};
