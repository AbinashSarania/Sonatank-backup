import React, { useState } from "react";
import { signUpCustomer } from "../../api/authAPI"; // Import the signUpCustomer function
import signupImage from "../../assets/images/auth-images (3).jpeg"; // Adjust the path to your image
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { FaArrowLeft } from "react-icons/fa"; // Import the left arrow icon

const CustomerSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Call the API function to sign up a customer
      const response = await signUpCustomer(email, password);
      setSuccessMessage("Customer created successfully!");
      setErrorMessage(""); // Clear any previous errors
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMessage(error.error || "Failed to create customer");
      setSuccessMessage(""); // Clear the success message
    }
  };

  const goBack = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          {/* Back Button */}
          <button
            onClick={goBack}
            className="flex items-center mb-6 text-blue-600"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </button>

          <h1 className="text-4xl font-semibold mb-6 text-center text-black font-new-amsterdam">
            Sign Up as a Customer
          </h1>
          {errorMessage && (
            <p className="text-red-500 mb-4 text-center text-base lg:text-lg font-montserrat">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 mb-4 text-center text-base lg:text-lg font-montserrat">
              {successMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your email"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-sm lg:text-base font-medium text-black font-montserrat"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Sign Up
            </button>
          </form>

          {/* Login Page Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="relative hidden lg:block w-1/2">
          <img
            src={signupImage} // Path to your image in assets
            alt="Sign Up Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerSignUp;
