// src/pages/Admin/UserStoreOverview.jsx

import React, { useState, useEffect } from "react";
import { fetchAllUsers, updateUserStatus } from "../../api/adminAPI"; // Import the new function
import icon1 from "../../assets/icons/icon (1).png"; // Import icon 1
import icon2 from "../../assets/icons/icon (2).png"; // Import icon 2
import icon3 from "../../assets/icons/icon (3).png"; // Import icon 3

const UserStoreOverview = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    accountType: "all", // all, jeweller, pawnBroker, customer
    accountStatus: "all", // all, active, suspended
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch users and store data from the API
    const fetchData = async () => {
      try {
        const fetchedUsers = await fetchAllUsers(); // Use the API function
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate totals for the cards
  const totalUsers = users.filter((user) => user.role !== "Admin").length; // Exclude Admins
  const totalActiveUsers = users.filter(
    (user) => user.isActive && user.role !== "Admin"
  ).length; // Exclude Admins

  // Count the total number of customers, jewellers, and brokers
  const totalCustomers = users.filter(
    (user) => user.role === "Customer"
  ).length;
  const totalJewellers = users.filter(
    (user) => user.role === "Jeweller"
  ).length;
  const totalBrokers = users.filter((user) => user.role === "Broker").length;

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredUsers = users.filter((user) => {
    const matchesType =
      filter.accountType === "all" || user.role === filter.accountType;
    const matchesStatus =
      filter.accountStatus === "all" ||
      (filter.accountStatus === "Active" ? user.isActive : !user.isActive);
    const matchesSearch =
      search === "" || user.email.toLowerCase().includes(search.toLowerCase());
    return (
      matchesType && matchesStatus && matchesSearch && user.role !== "Admin"
    ); // Exclude Admins
  });

  // Function to handle status change
  const handleStatusChange = async (userId, isActive) => {
    try {
      await updateUserStatus(userId, !isActive); // Toggle the status
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, isActive: !isActive } : user
      );
      setUsers(updatedUsers); // Update state with new users array
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 font-raleway">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        User Overview
      </h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {/* Total Users Card */}
        <div
          className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500
          p-5 shadow-lg rounded-lg flex justify-between items-center overflow-hidden transition duration-300 hover:shadow-xl"
        >
          <div className="flex flex-col">
            <h3
              className="text-white font-semibold"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Total Users
            </h3>
            <p className="text-5xl font-semibold text-white">{totalUsers}</p>
            <p className="text-white opacity-80">
              Total registered users on the platform.
            </p>
          </div>
          <img src={icon1} alt="Total Users" className="w-24 h-24 ml-4" />
        </div>

        {/* Total Active Users Card */}
        <div
          className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600
          p-5 shadow-lg rounded-lg flex justify-between items-center overflow-hidden transition duration-300 hover:shadow-xl"
        >
          <div className="flex flex-col">
            <h3
              className="text-white font-semibold"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Active Users
            </h3>
            <p className="text-5xl font-semibold text-white">
              {totalActiveUsers}
            </p>
            <p className="text-white opacity-80">
              Total active users currently online.
            </p>
          </div>
          <img src={icon2} alt="Active Users" className="w-24 h-24 ml-4" />
        </div>

        {/* Total Customers, Jewellers, and Brokers Card */}
        <div
          className="relative bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500
          p-5 shadow-lg rounded-lg flex flex-col overflow-hidden transition duration-300 hover:shadow-xl"
        >
          <h3
            className="text-white text-lg font-semibold mb-2"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Total Account Types
          </h3>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <p className="text-md font-semibold text-white">
                Customers: {totalCustomers}
              </p>
              <p className="text-md font-semibold text-white">
                Jewellers: {totalJewellers}
              </p>
              <p className="text-md font-semibold text-white">
                Brokers: {totalBrokers}
              </p>
            </div>
            <img src={icon3} alt="Account Types" className="w-24 h-24" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex space-x-2 mb-2 md:mb-0">
          <select
            name="accountType"
            value={filter.accountType}
            onChange={handleFilterChange}
            className="p-2 border rounded-md bg-gray-50"
          >
            <option value="all">All Account Types</option>
            <option value="Jeweller">Jewellers</option>
            <option value="Broker">Brokers</option>
            <option value="Customer">Customers</option>
          </select>

          <select
            name="accountStatus"
            value={filter.accountStatus}
            onChange={handleFilterChange}
            className="p-2 border rounded-md bg-gray-50"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email"
          className="p-2 border rounded-md bg-gray-50 w-full md:w-1/3"
          style={{ fontFamily: "Raleway, sans-serif" }}
        />
      </div>

      {/* User and Store Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-500 via-blue-500 to-black">
              <th
                className="p-4 text-left text-md font-medium text-white"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Email
              </th>
              <th
                className="p-4 text-left text-md font-medium text-white"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Role
              </th>
              <th
                className="p-4 text-left text-md font-medium text-white flex items-center"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <span className="mr-2">Active</span>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b transition hover:bg-gray-50"
              >
                <td
                  className="p-4 text-sm font-bold text-gray-800"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  {user.email}
                </td>
                <td
                  className="p-4 text-sm text-gray-800"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  {user.role}
                </td>
                <td className="p-4 text-sm text-gray-800">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={user.isActive}
                      onChange={() =>
                        handleStatusChange(user.id, user.isActive)
                      }
                    />
                    <div
                      className={`w-10 h-4 rounded-full shadow-inner ${
                        user.isActive ? "bg-blue-500" : "bg-red-500"
                      }`}
                    ></div>
                    <div
                      className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ease-in-out ${
                        user.isActive ? "transform translate-x-6" : ""
                      }`}
                    ></div>
                  </label>
                </td>
                <td className="p-4 text-center">
                  <button className="bg-gray-300 text-gray-800 py-1 px-3 rounded-md text-sm hover:bg-gray-400 transition duration-300">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStoreOverview;
