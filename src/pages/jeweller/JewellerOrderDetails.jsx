// src/pages/jeweller/JewellerOrderDetails.jsx

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Import close icon from Heroicons

const JewellerOrderDetails = ({ order, onClose }) => {
  const [status, setStatus] = useState(order.status); // State to hold the current status

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    // Here you would implement the logic to update the status in your backend
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white shadow-lg w-full max-w-md p-6 relative overflow-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <XMarkIcon className="h-6 w-6" /> {/* Close icon */}
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Order Details</h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Customer Name:</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">{order.customerName}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Product Name:</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">{order.item}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Phone Number:</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">{order.phoneNumber}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Address:</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">{order.address}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Pin Code:</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">{order.pinCode}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Price:</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">₹{order.price}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Paid Through:</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">{order.paidThrough}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Status:</label>
            <div className="flex items-center">
              <select
                value={status}
                onChange={handleChangeStatus}
                className="border border-gray-300 rounded-md p-2 w-full mr-2 bg-white"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => console.log("Update order status to:", status)} // Implement your update logic here
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewellerOrderDetails;
