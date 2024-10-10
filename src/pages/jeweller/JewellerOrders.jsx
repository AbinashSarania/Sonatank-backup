// src/pages/jeweller/JewellerOrders.jsx

import React, { useState, useEffect } from "react";
import { fetchJewellerOrders, updateOrderItemStatus, OrderStatus } from "../../api/jewellerAPI"; // Import the required functions

const JewellerOrders = () => {
  const [orders, setOrders] = useState([]); // State for orders
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All"); // State for filtering by status

  // Fetch orders on component mount
  useEffect(() => {
    const getOrders = async () => {
      try {
        const fetchedOrders = await fetchJewellerOrders();
        // Flatten the orders to include only necessary details
        const simplifiedOrders = fetchedOrders.map(order => ({
          id: order.id,
          userId: order.userId,
          createdAt: order.createdAt,
          itemName: order.items[0]?.product?.name || "Unknown Item", // Ensure itemName is defined
          itemQuantity: order.items[0]?.quantity || 0,
          itemPrice: order.items[0]?.price || 0,
          status: order.items[0]?.status || OrderStatus.PENDING,
        }));
        setOrders(simplifiedOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    getOrders();
  }, []);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesName = order.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;

    return matchesName && matchesStatus;
  });

  // Function to update the order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderItemStatus(orderId, newStatus);
      // Update the order in the local state
      setOrders(prevOrders =>
        prevOrders.map(order => (order.id === orderId ? updatedOrder : order))
      );
      alert("Order status updated successfully!"); // Show success message
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="container mx-auto p-6 font-raleway">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by item name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="All">All</option>
          <option value={OrderStatus.PENDING}>Pending</option>
          <option value={OrderStatus.COMPLETED}>Completed</option>
          <option value={OrderStatus.CANCELLED}>Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 via-red-500 to-blue-500 rounded-t-lg">
              <th className="py-3 px-4 text-left text-md font-medium text-white border-b">
                Item Name
              </th>
              <th className="py-3 px-4 text-left text-md font-medium text-white border-b">
                Quantity
              </th>
              <th className="py-3 px-4 text-left text-md font-medium text-white border-b">
                Price
              </th>
              <th className="py-3 px-4 text-left text-md font-medium text-white border-b">
                Status
              </th>
              <th className="py-3 px-4 text-center text-md font-medium text-white border-b">
                Update Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order.id} className="border-b transition hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-800 text-left">
                    {order.itemName}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800 text-left">
                    {order.itemQuantity}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800 text-left">
                    {order.itemPrice}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800 text-left">
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full ${
                        order.status === OrderStatus.COMPLETED
                          ? "bg-green-100 text-green-700"
                          : order.status === OrderStatus.PENDING
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value={OrderStatus.PENDING}>Pending</option>
                      <option value={OrderStatus.COMPLETED}>Completed</option>
                      <option value={OrderStatus.CANCELLED}>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-600">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JewellerOrders;
