// customerAPI.js

import apiClient from "./baseAPI"; // Adjust the import path as needed

// Helper function to handle API requests
const handleApiRequest = async (request) => {
  try {
    const { data } = await request();
    return data; // Return the response data
  } catch (error) {
    console.error("API Request Error:", error);
    throw error; // Rethrow the error for handling
  }
};

/**
 * Function to fetch all products
 * @returns {Promise} - API response with the list of products
 */
const fetchAllProducts = async () => {
  return handleApiRequest(() => apiClient.get("/product/view-all"));
};

/**
 * Function to add a product to the cart
 * @param {string} productId - The ID of the product to add to the cart
 * @param {number} quantity - The quantity of the product to add
 * @returns {Promise} - API response indicating success or failure
 */
const addToCart = async (productId, quantity) => {
  return handleApiRequest(
    () => apiClient.post("/cart", { productId, quantity }) // Include quantity in the request body
  );
};

/**
 * Function to get the cart items
 * @returns {Promise} - API response with the cart items
 */
const getCartItems = async () => {
  return handleApiRequest(() => apiClient.get("/cart")); // Adjust the endpoint as needed
};

/**
 * Function to delete a cart item
 * @param {number} itemId - The ID of the item to delete from the cart
 * @returns {Promise} - API response indicating success or failure
 */
const deleteCartItem = async (itemId) => {
  return handleApiRequest(() => apiClient.delete(`/cart/${itemId}`)); // Delete request to the cart endpoint
};

/**
 * Function to create an order
 * @param {string} paymentMethod - The payment method for the order
 * @returns {Promise} - API response indicating success or failure
 */
const createOrder = async (paymentMethod) => {
  return handleApiRequest(
    () => apiClient.post("/order", { paymentMethod }) // Send the payment method in the request body
  );
};

/**
 * Function to get the order details
 * @returns {Promise} - API response with the order details
 */
const getOrderDetails = async () => {
  return handleApiRequest(() => apiClient.get("/order")); // Fetch order details from the endpoint
};

// Export only the necessary functions for use in other components
export {
  fetchAllProducts,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getOrderDetails, // Include the new function in exports
};
