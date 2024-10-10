import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Directly set the base URL here

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Handle token expiration or invalid tokens globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration or invalid tokens globally
    if (error.response?.status === 401) {
      // Check if the error is due to token expiration or invalid token
      if (
        error.response.data?.error === "Token expired" ||
        error.response.data?.error === "Invalid token"
      ) {
        console.warn("Token expired or invalid. Redirecting to login.");
        localStorage.removeItem("authToken");
        window.location.href = "/"; // Redirect to login if token is invalid
      } else {
        // Handle other 401 errors (e.g., invalid credentials) without redirecting
        console.warn("Unauthorized access, but not token related.");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
