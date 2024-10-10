import apiClient from "./baseAPI"; // Adjust the import path as needed

// Function to fetch all users (Admin only)
export const fetchAllUsers = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data; // Return the list of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || "Unknown error occurred"; // Throw the error for handling in UI
  }
};

// Function to update the user's active status
export const updateUserStatus = async (userId, isActive) => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  try {
    const response = await apiClient.put(`/user/${userId}`, {
      isActive,
    });
    return response.data; // Return the updated user data
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for further handling
  }
};

// Function to create a new category
export const createCategory = async ({ name, description }) => {
  if (!name || !description) {
    throw new Error("Name and description are required.");
  }

  try {
    const response = await apiClient.post("/category", { name, description }); // Include both name and description
    return response.data; // Return the created category
  } catch (error) {
    console.error("Error creating category:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};

// Function to fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/category");
    return response.data; // Return the list of categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};

// Function to update a category
export const updateCategory = async ({ id, name, description }) => {
  if (!id || !name || !description) {
    throw new Error("Category ID, name, and description are required.");
  }

  try {
    const response = await apiClient.put(`/category/${id}`, {
      name,
      description,
    }); // Include both name and description in the request body
    return response.data; // Assuming the API returns the updated category
  } catch (error) {
    console.error("Error updating category:", error);
    throw error.response?.data || "Unknown error occurred"; // Rethrow the error for handling in the component
  }
};

// Function to delete a category
export const deleteCategory = async (categoryId) => {
  if (!categoryId) {
    throw new Error("Category ID is required.");
  }

  try {
    const response = await apiClient.delete(`/category/${categoryId}`);
    return response.data; // Return the response confirming deletion
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};

// Function to create a new subcategory under a specific category
export const createSubcategory = async (categoryId, { name, description }) => {
  // Ensure the function checks for all required parameters
  if (!categoryId) {
    throw new Error("Category ID is required.");
  }
  if (!name) {
    throw new Error("Name is required.");
  }
  if (!description) {
    throw new Error("Description is required.");
  }

  try {
    const response = await apiClient.post(
      `/category/${categoryId}/subcategory`, // Ensure this endpoint is correct
      { name, description }
    );

    // Return the created subcategory data
    return response.data; // Assuming the API returns the created subcategory
  } catch (error) {
    // Handle and log the error
    console.error(
      "Error creating subcategory:",
      error.response?.data || error.message
    );

    // Throw the error for further handling in the calling function
    throw new Error(
      `Failed to create subcategory: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

// Function to fetch all subcategories under a specific category
export const fetchSubcategories = async (categoryId) => {
  if (!categoryId) {
    throw new Error("Category ID is required.");
  }

  try {
    const response = await apiClient.get(`/category/${categoryId}/subcategory`);
    return response.data; // Return the list of subcategories
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};

// Function to update a subcategory under a specific category
export const updateSubcategory = async (
  categoryId,
  subcategoryId,
  { name, description }
) => {
  // Ensure categoryId and subcategoryId are provided
  if (!categoryId || !subcategoryId || !name || !description) {
    throw new Error(
      "Category ID, Subcategory ID, name, and description are required."
    );
  }

  try {
    const response = await apiClient.put(
      `/category/${categoryId}/subcategory/${subcategoryId}`,
      { name, description }
    );

    // Return the updated subcategory data
    return response.data;
  } catch (error) {
    console.error(
      "Error updating subcategory:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to delete a subcategory under a specific category
export const deleteSubcategory = async (categoryId, subcategoryId) => {
  if (!categoryId || !subcategoryId) {
    throw new Error("Category ID and Subcategory ID are required.");
  }

  try {
    const response = await apiClient.delete(
      `/category/${categoryId}/subcategory/${subcategoryId}`
    );
    return response.data; // Return the response confirming deletion
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};

// Function to create a new subscription
export const createSubscription = async (subscriptionData) => {
  // Validate required fields in the subscription data
  if (
    !subscriptionData ||
    !subscriptionData.planName ||
    !subscriptionData.planValidityDays ||
    !subscriptionData.numProductsAllowed ||
    !subscriptionData.price
  ) {
    throw new Error(
      "Plan name, validity days, number of products allowed, and price are required."
    );
  }

  try {
    const response = await apiClient.post("/subscription", subscriptionData); // Adjust the endpoint if necessary
    return response.data; // Return the created subscription data
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};

// Function to get a subscription plan 
export const getSubscriptionPlan = async (id) => {
  try {
    const response = await apiClient.get(`/subscription`);
    return response.data; // Return the subscription plan data
  } catch (error) {
    console.error("Error fetching subscription plan:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};

// Function to update a specific subscription plan by ID
export const updateSubscriptionPlan = async (id, subscriptionData) => {
  try {
    const response = await apiClient.put(
      `/subscription/${id}`,
      subscriptionData
    );
    return response.data; // Return the updated subscription plan data
  } catch (error) {
    console.error("Error updating subscription plan:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};

// Function to delete a specific subscription plan by ID
export const deleteSubscriptionPlan = async (id) => {
  try {
    await apiClient.delete(`/subscription/${id}`);
    return { message: "Subscription plan deleted successfully" }; // Return a success message
  } catch (error) {
    console.error("Error deleting subscription plan:", error);
    throw error.response?.data || "Unknown error occurred"; // Re-throw the error for handling in the calling component
  }
};
