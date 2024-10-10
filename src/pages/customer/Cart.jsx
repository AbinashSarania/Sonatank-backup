import React, { useEffect, useState } from "react";
import {
  getCartItems,
  deleteCartItem,
  fetchAllProducts,
  createOrder,
} from "../../api/customerAPI"; // Import the necessary functions

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [loading, setLoading] = useState(true); // State for loading status
  const [productDetails, setProductDetails] = useState([]); // State to hold detailed product info
  const [paymentMethod, setPaymentMethod] = useState("UPI"); // Default payment method
  const [orderSuccess, setOrderSuccess] = useState(null); // State for order success message

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems(); // Fetch cart items
        console.log(response); // Log the response to debug
        setCartItems(response.products || []); // Update state with fetched products, default to an empty array
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]); // Reset to empty array on error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCartItems(); // Call the function to fetch cart items
  }, []);

  useEffect(() => {
    const fetchProductDetailsForCart = async () => {
      try {
        const response = await fetchAllProducts(); // Fetch all products at once
        const detailsMap = response.products.reduce((acc, product) => {
          acc[product.id] = product; // Map product ID to product details
          return acc;
        }, {});

        const details = cartItems.map(
          (item) => detailsMap[item.productId] || {}
        ); // Match cart items with their product details
        setProductDetails(details);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetailsForCart(); // Fetch product details if cart items exist
    }
  }, [cartItems]);

  // Function to handle item deletion
  const handleDelete = async (productId) => {
    try {
      await deleteCartItem(productId); // Call the delete function
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId) // Update the state to remove the deleted item
      );
      setProductDetails((prevDetails) =>
        prevDetails.filter((detail) => detail.id !== productId) // Update the state to remove the deleted item details
      );
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // Function to handle order creation
  const handleCreateOrder = async () => {
    try {
      await createOrder(paymentMethod); // Call createOrder with the selected payment method
      setOrderSuccess("Order created successfully!"); // Set success message
    } catch (error) {
      console.error("Error creating order:", error);
      setOrderSuccess("Failed to create order."); // Set error message
    }
  };

  if (loading) {
    return (
      <p className="text-center text-xl font-bold">Loading cart items...</p>
    ); // Display loading message
  }

  return (
    <div className="container mx-auto p-6 font-raleway">
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p> // Message for empty cart
      ) : (
        <ul className="space-y-6">
          {cartItems.map((item, index) => {
            const product = productDetails[index]; // Get the corresponding product details
            return (
              <li
                key={item.productId}
                className="flex items-start bg-white shadow-lg rounded-md p-4 transition-shadow duration-300 "
              >
                {product && (
                  <>
                    <img
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : "/path/to/default/image.jpg"
                      } // Use a default image if none is available
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <div className="flex-grow ml-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {product.name}
                      </h2>
                      <p className="text-gray-700">
                        Description: {product.description}
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        Price: ₹{product.price}
                      </p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </>
                )}
                <button
                  onClick={() => handleDelete(item.productId)} // Use productId for deletion
                  className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                >
                  Delete
                </button>{" "}
                {/* Delete button */}
              </li>
            );
          })}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Payment Method</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method
            className="mt-2 mb-4 mr-4 border border-gray-300 rounded-md p-2"
          >
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
          <button
            onClick={handleCreateOrder} // Trigger order creation
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Order
          </button>
          {orderSuccess && (
            <p className="mt-2 text-green-600">{orderSuccess}</p> // Display success or error message
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
