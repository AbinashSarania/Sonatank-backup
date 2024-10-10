import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authAPI"; // Adjust the import based on your structure
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa"; // Import the left arrow icon and eye icons
import signupImage from "../../assets/images/type-earrings.jpeg"; // Adjust the path to your image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("Customer"); // Default role
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login the user and get the token
      const response = await loginUser(email, password);
      console.log("Login response:", response); // Debugging: check login response

      if (response && response.token) {
        // Check if the user's role matches the selected role
        const decodedToken = decodeToken(response.token); // Decode token to extract role
        console.log("Decoded token:", decodedToken); // Debugging: check the decoded token

        if (decodedToken && decodedToken.role.toLowerCase() === role.toLowerCase()) {
          setSuccess("Login successful!");
          setError("");
          navigateBasedOnRole(decodedToken.role); // Navigate based on the decoded role
        } else {
          setError("Invalid credentials for the selected role.");
          setSuccess("");
        }
      } else {
        setError("Invalid email or password.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  // Helper function to decode JWT token
  const decodeToken = (token) => {
    const payloadBase64 = token.split(".")[1]; // Get the payload part of the JWT
    const decodedPayload = atob(payloadBase64); // Decode the Base64 string
    return JSON.parse(decodedPayload); // Parse it as JSON
  };

  // Function to navigate based on user role
  const navigateBasedOnRole = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        navigate("/admin/admin-dashboard"); // Navigate to the admin dashboard
        break;
      case "jeweller":
        navigate("/jeweller/jeweller-dashboard/product-management"); // Navigate to the jeweller dashboard
        break;
      case "customer":
        navigate("/customer/customer-home"); // Navigate to the customer dashboard
        break;
      case "pawn broker":
        navigate("/pawnbroker/dashboard"); // Navigate to the pawn broker dashboard
        break;
      default:
        setError("Role not recognized.");
        break;
    }
  };

  const goBack = () => {
    console.log("Navigating back"); // Debugging: check if goBack is triggered
    navigate("/"); // Redirect to the main page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Back button */}
        <button
          className="absolute top-4 left-4 flex items-center text-black focus:outline-none"
          onClick={goBack}
        >
          <FaArrowLeft className="h-6 w-6" />
          <span className="ml-2">Back</span>
        </button>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <h1 className="text-4xl font-semibold mb-6 text-center text-black font-new-amsterdam">
            Login
          </h1>
          {error && (
            <p className="text-red-500 mb-4 text-center text-base lg:text-lg font-montserrat">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 mb-4 text-center text-base lg:text-lg font-montserrat">
              {success}
            </p>
          )}
          <form onSubmit={handleLogin}>
            {/* Role Selection */}
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-sm lg:text-base font-medium text-black font-montserrat"
              >
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Customer">Customer</option>
                <option value="Jeweller">Jeweller</option>
                <option value="Pawn Broker">Pledger</option>
              </select>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm lg:text-base font-medium text-black font-montserrat"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out hover:border-blue-500 hover:shadow-md"
              />
            </div>

            {/* Password Input */}
            <div className="mb-8 relative">
              <label
                htmlFor="password"
                className="block text-sm lg:text-base font-medium text-black font-montserrat"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Show/hide password based on state
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out hover:border-blue-500 hover:shadow-md"
              />
              {/* Toggle password visibility */}
              <button
                type="button"
                className="absolute right-3 top-10 md:top-11 focus:outline-none hover:text-blue-500 transition duration-200 ease-in-out"
                onClick={() => setShowPassword((prev) => !prev)} // Toggle the visibility state
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg"
            >
              Login
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative hidden lg:block w-1/2">
          <img
            src={signupImage}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
