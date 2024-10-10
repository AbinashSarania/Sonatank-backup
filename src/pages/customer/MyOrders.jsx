import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../../api/customerAPI"; // Import the function to fetch order details

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderDetails(); // Fetch order details
        setOrders(response.orders || []); // Set orders in state, default to empty array
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Reset to empty array on error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, []);

  if (loading) {
    return <p>Loading your orders...</p>; // Loading message
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>; // Message for no orders
  }

  return (
    <div className="container mx-auto p-6 font-raleway">
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Payment Status: {order.paymentStatus}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Total Amount: ₹{order.totalAmount}</p>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>

            <h3 className="font-bold mt-2">Items:</h3>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li key={item.id} className="border-t pt-2">
                  <p>Product Name: {item.product.name}</p>
                  <p>Description: {item.product.description}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Status: {item.status}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
