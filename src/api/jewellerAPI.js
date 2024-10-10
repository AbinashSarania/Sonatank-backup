// jewellerAPI.js

import apiClient from "./baseAPI"; // Adjust the import path as needed

const ArticleType = Object.freeze({
  GOLD: "Gold",
  SILVER: "Silver",
  PLATINUM: "Platinum",
  DIAMOND: "Diamond",
  ONE_GRAM_GOLD: "1g Gold",
  OTHER: "Other",
});

const OrderStatus = Object.freeze({
  PENDING: "Pending",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
});

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
 * Function to create a new product
 * @param {Object} productData - Data for the new product
 * @returns {Promise} - API response
 */
const createProduct = async (productData) => {
  const {
    name,
    description,
    price,
    categoryId,
    subcategoryId,
    type,
    customType,
  } = productData;

  // Validate the type and prepare the body
  if (!Object.values(ArticleType).includes(type)) {
    throw new Error(
      "Invalid type provided. Must be one of the predefined types."
    );
  }
  if (type === ArticleType.OTHER && !customType) {
    throw new Error("Custom type must be provided when type is 'Other'.");
  }

  const requestBody = {
    name,
    description,
    price,
    categoryId,
    subcategoryId,
    type,
    ...(type === ArticleType.OTHER && { customType }), // Include customType only if type is 'Other'
  };

  return handleApiRequest(() => apiClient.post("/product", requestBody));
};

/**
 * Function to fetch all products
 * @returns {Promise} - API response with the list of products
 */
const fetchAllProducts = async () => {
  return handleApiRequest(() => apiClient.get("/product"));
};

/**
 * Function to fetch a product by ID
 * @param {number} productId - The ID of the product to fetch
 * @returns {Promise} - API response with the product data
 */
const fetchProductById = async (productId) => {
  return handleApiRequest(() => apiClient.get(`/product/${productId}`));
};

/**
 * Function to fetch all images for a specific product
 * @param {number} productId - The ID of the product
 * @returns {Promise} - API response with the list of images or a 'No images' message
 */
const fetchProductImages = async (productId) => {
  if (!productId) throw new Error("Product ID must be provided.");

  try {
    const data = await handleApiRequest(() =>
      apiClient.get(`/product/${productId}/image`)
    );
    return data; // Return image data if found
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Return an empty array when no images are found
    }
    throw error; // For other errors, throw the error
  }
};

/**
 * Function to edit an existing product
 * @param {number} productId - The ID of the product to edit
 * @param {Object} updatedProductData - Data to update the product
 * @returns {Promise} - API response with the updated product data
 */
const editProduct = async (productId, updatedProductData) => {
  if (!productId) throw new Error("Product ID must be provided.");

  // Validate required fields
  const requiredFields = [
    "name",
    "description",
    "price",
    "categoryId",
    "subcategoryId",
    "type",
  ];
  requiredFields.forEach((field) => {
    if (!updatedProductData[field]) {
      throw new Error(`${field} must be provided.`);
    }
  });

  console.log(
    "Updating product with ID:",
    productId,
    "Data:",
    updatedProductData
  );
  return handleApiRequest(() =>
    apiClient.put(`/product/${productId}`, updatedProductData)
  );
};

/**
 * Function to delete a product by ID
 * @param {number} productId - The ID of the product to delete
 * @returns {Promise} - API response confirming deletion
 */
const deleteProduct = async (productId) => {
  if (!productId) throw new Error("Product ID must be provided.");
  return handleApiRequest(() => apiClient.delete(`/product/${productId}`));
};

/**
 * Function to upload an image file for a specific product
 * @param {number} productId - The ID of the product
 * @param {File} imageFile - The image file to upload
 * @returns {Promise} - API response with the image URL or upload confirmation
 */
const uploadProductImage = async (productId, imageFile) => {
  if (!productId) throw new Error("Product ID must be provided.");
  if (!(imageFile instanceof File))
    throw new Error("A valid image file must be provided.");
  if (!imageFile.type.startsWith("image/"))
    throw new Error("The uploaded file is not an image.");

  const formData = new FormData();
  formData.append("image", imageFile);

  return handleApiRequest(() =>
    apiClient.post(`/product/${productId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
};

/**
 * Function to delete a product image by product ID and image ID
 * @param {number} productId - The ID of the product
 * @param {number} imageId - The ID of the image to delete
 * @returns {Promise} - API response confirming deletion
 */
const deleteProductImage = async (productId, imageId) => {
  if (!productId) throw new Error("Product ID must be provided.");
  if (!imageId) throw new Error("Image ID must be provided.");
  return handleApiRequest(() =>
    apiClient.delete(`/product/${productId}/image/${imageId}`)
  );
};

/**
 * Function to fetch jeweller orders
 * @returns {Promise} - API response with the list of jeweller orders
 */
const fetchJewellerOrders = async () => {
  return handleApiRequest(() => apiClient.get("/order/jeweller-orders"));
};

/**
 * Function to update the status of an order item
 * @param {number} orderItemId - The ID of the order item to update
 * @param {string} status - The new status for the order item
 * @returns {Promise} - API response with the updated order item
 */
const updateOrderItemStatus = async (orderItemId, status) => {
  if (!orderItemId) throw new Error("Order item ID must be provided.");
  if (!Object.values(OrderStatus).includes(status)) {
    throw new Error(
      "Invalid status provided. Must be one of the predefined statuses."
    );
  }

  const requestBody = {
    status,
  };

  return handleApiRequest(() =>
    apiClient.put(`/order/orderitem/${orderItemId}`, requestBody)
  );
};

/**
 * Function to edit jeweller details
 * @param {Object} jewellerData - Data for the jeweller to update
 * @returns {Promise} - API response with the updated jeweller data
 */
const editJewellerDetails = async (jewellerData) => {
  const { storeName, storeOwnerName, address, state, city } = jewellerData;

  // Validate required fields
  const requiredFields = [
    "storeName",
    "storeOwnerName",
    "address",
    "state",
    "city",
  ];
  requiredFields.forEach((field) => {
    if (!jewellerData[field]) {
      throw new Error(`${field} must be provided.`);
    }
  });

  const requestBody = {
    storeName,
    storeOwnerName,
    address,
    state,
    city,
  };

  return handleApiRequest(() => apiClient.put("/jeweller/edit", requestBody));
};

// Export the new function along with existing ones
export {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  fetchProductImages,
  editProduct,
  deleteProduct,
  deleteProductImage,
  uploadProductImage,
  fetchJewellerOrders,
  updateOrderItemStatus,
  editJewellerDetails, // New function added here
  ArticleType,
  OrderStatus,
};
