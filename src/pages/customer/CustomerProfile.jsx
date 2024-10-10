// src/pages/customer/CustomerProfile.jsx

import React, { useState, useEffect } from "react";

const CustomerProfile = () => {
  // State for customer profile data
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Springfield, USA",
  });

  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode
  const [formData, setFormData] = useState({ ...profileData }); // State for form data

  // Simulate fetching profile data on component mount
  useEffect(() => {
    // Fetch the profile data from an API (if necessary)
    // setProfileData(fetchedData);
  }, []);

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to save changes
  const handleSave = () => {
    setProfileData({ ...formData }); // Update the profile data with the form values
    setIsEditing(false); // Exit edit mode after saving
  };

  // Handle cancel action
  const handleCancel = () => {
    setFormData({ ...profileData }); // Reset form data to original profile data
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="container mx-auto p-6 font-raleway">
      <div className="bg-white shadow-md rounded-lg p-6">
        {isEditing ? (
          <div>
            {/* Edit Form */}
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-800">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-800">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-800">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-800">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Display Profile Data */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Name:</h2>
              <p className="text-gray-600">{profileData.name}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Email:</h2>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Phone:</h2>
              <p className="text-gray-600">{profileData.phone}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Address:</h2>
              <p className="text-gray-600">{profileData.address}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
