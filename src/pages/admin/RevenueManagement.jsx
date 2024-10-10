import React, { useState, useEffect } from "react";
import {
  createSubscription,
  getSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from "../../api/adminAPI"; // Adjust the import path as needed

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({
    planName: "",
    planValidityDays: 30,
    numProductsAllowed: 100,
    price: 2000,
  });
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch all subscriptions on component mount
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    try {
      const allSubscriptions = await getSubscriptionPlan(); // Adjust this call based on your API
      setSubscriptions(allSubscriptions);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state based on the input type
    setNewSubscription((prev) => ({
      ...prev,
      [name]: name === "planValidityDays" || name === "numProductsAllowed" || name === "price"
        ? value === "" ? "" : Number(value) // Convert to number if value is provided, allow empty string
        : value, // For strings
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubscription) {
        await updateSubscriptionPlan(editingSubscription.id, newSubscription);
        setEditingSubscription(null); // Reset editing
      } else {
        await createSubscription(newSubscription);
      }
      resetForm(); // Reset form state after creation/updating
      fetchSubscriptions(); // Refresh subscriptions list
      setIsModalOpen(false); // Close the modal after creation/updating
    } catch (error) {
      console.error("Failed to create/update subscription:", error);
    }
  };

  const resetForm = () => {
    setNewSubscription({
      planName: "",
      planValidityDays: 30,
      numProductsAllowed: 100,
      price: 2000,
    });
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setNewSubscription({
      planName: subscription.planName,
      planValidityDays: subscription.planValidityDays,
      numProductsAllowed: subscription.numProductsAllowed,
      price: subscription.price,
    });
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubscriptionPlan(id);
      fetchSubscriptions(); // Refresh subscriptions list
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  // Modal component
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3 relative">
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={onClose}
            title="Close"
          >
            &times; {/* Close button */}
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 font-raleway">
     

      {/* Subscription Form (for new subscriptions) */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Create New Subscription</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Plan Name</label>
            <input
              type="text"
              name="planName"
              value={newSubscription.planName}
              onChange={handleChange}
              placeholder="Enter Plan Name"
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </div>

          {/* Plan Validity Days */}
          <div>
            <label className="block text-sm font-semibold mb-2">Validity Days</label>
            <input
              type="number"
              name="planValidityDays"
              value={newSubscription.planValidityDays}
              onChange={handleChange}
              placeholder="Enter Validity Days"
              min="1" // Set minimum value
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </div>

          {/* Number of Products Allowed */}
          <div>
            <label className="block text-sm font-semibold mb-2">Products Allowed</label>
            <input
              type="number"
              name="numProductsAllowed"
              value={newSubscription.numProductsAllowed}
              onChange={handleChange}
              placeholder="Enter Number of Products"
              min="1" // Set minimum value
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={newSubscription.price}
              onChange={handleChange}
              placeholder="Enter Price"
              min="0" // Set minimum value
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-64 bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Create Subscription
        </button>
      </form>

      {/* Subscriptions List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Current Subscription Plans</h3>
        {subscriptions.length > 0 ? (
          <ul className="space-y-4">
            {subscriptions.map((subscription) => (
              <li key={subscription.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="text-lg font-semibold">{subscription.planName}</h4>
                  <p className="text-sm">
                    Validity: {subscription.planValidityDays} days, Products Allowed: {subscription.numProductsAllowed}, Price: ₹{subscription.price}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(subscription)}
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subscription.id)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No subscriptions available.</p>
        )}
      </div>

      {/* Modal for Editing Subscription */}
      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        resetForm(); // Reset form state on modal close
        setEditingSubscription(null); // Clear editing state on close
      }}>
        <form onSubmit={handleSubmit} className="mb-4">
          <h3 className="text-2xl font-semibold mb-4">Edit Subscription</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Plan Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Plan Name</label>
              <input
                type="text"
                name="planName"
                value={newSubscription.planName}
                onChange={handleChange}
                placeholder="Enter Plan Name"
                required
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
            </div>

            {/* Plan Validity Days */}
            <div>
              <label className="block text-sm font-semibold mb-2">Validity Days</label>
              <input
                type="number"
                name="planValidityDays"
                value={newSubscription.planValidityDays}
                onChange={handleChange}
                placeholder="Enter Validity Days"
                min="1" // Set minimum value
                required
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
            </div>

            {/* Number of Products Allowed */}
            <div>
              <label className="block text-sm font-semibold mb-2">Products Allowed</label>
              <input
                type="number"
                name="numProductsAllowed"
                value={newSubscription.numProductsAllowed}
                onChange={handleChange}
                placeholder="Enter Number of Products"
                min="1" // Set minimum value
                required
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={newSubscription.price}
                onChange={handleChange}
                placeholder="Enter Price"
                min="0" // Set minimum value
                required
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Update Subscription
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SubscriptionManagement;
