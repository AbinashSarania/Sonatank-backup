import apiClient from "./baseAPI";

// Function to sign up an admin
export const signUpAdmin = async (email, password) => {
  try {
    const response = await apiClient.post("/user/admin", {
      email,
      password,
    });
    return response.data; // Return the user data if successful
  } catch (error) {
    console.error("Error signing up admin:", error);
    throw error.response?.data || "Unknown error occurred"; // Throw the error for handling in UI
  }
};

// Function to sign up a customer
export const signUpCustomer = async (email, password) => {
  try {
    const response = await apiClient.post("/user/customer", {
      email,
      password,
    });
    return response.data; // Return the user data if successful
  } catch (error) {
    console.error("Error signing up customer:", error);
    throw error.response?.data || "Unknown error occurred"; // Throw the error for handling in UI
  }
};

// Function to sign up a jeweller
export const signUpJeweller = async (email, password) => {
  try {
    const response = await apiClient.post("/user/jeweller", {
      email,
      password,
    });
    return response.data; // Return the user data if successful
  } catch (error) {
    console.error("Error signing up jeweller:", error);
    throw error.response?.data || "Unknown error occurred"; // Throw the error for handling in UI
  }
};

// Function for User login
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token); // Store token in localStorage
      console.log("Login successful. Token stored.");
      return response.data;
    } else {
      throw new Error("Login failed: No token received.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};