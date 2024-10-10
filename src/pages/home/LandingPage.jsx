import React from "react";
import { Link } from "react-router-dom";

import {
  FaUserPlus,
  FaSearch,
  FaMoneyBillWave,
  FaComments,
  FaBell,
  FaLock,
  FaGem,
  FaExchangeAlt,
  FaUserCircle,
} from "react-icons/fa";

import bgImage from "../../assets/images/HeroImage4.jpg"; // Adjust the path based on your directory structure

import paperbg from "../../assets/images/paper-bg.jpg"; // Using the paperbg image for all cards

import typeRings from "../../assets/images/type-rings.jpeg";
import typeNecklace from "../../assets/images/type-necklace.jpeg";
import typeEarrings from "../../assets/images/type-earrings.jpeg";
import typeBracelet from "../../assets/images/type-bracelet.jpeg";

import highlightedImage1 from "../../assets/images/highlighted-image1.png"; // replace with actual image paths
import highlightedImage2 from "../../assets/images/highlighted-image2.png"; // replace with actual image paths
import highlightedImage3 from "../../assets/images/highlighted-image3.png"; // replace with actual image paths

// HeroSection Component
const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-25 z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center text-center h-full z-20 px-4 md:px-8">
        <div className="max-w-2xl w-full text-center mb-6">
          <h2 className="text-4xl md:text-6xl  text-white lowercase tracking-widest font-alex-brush">
            #sonatank
          </h2>
          <h1 className="text-3xl md:text-7xl text-white mb-4 font-raleway">
            <span className="text-yellow-500">Buy</span>,{" "}
            <span className="text-yellow-500">Sell</span>, and{" "}
            <span className="text-yellow-500">Pledge</span> Jewelry Seamlessly
          </h1>

          <p className="text-xl text-white mb-8 font-raleway">
            Your Trusted Marketplace for Buying, Selling, and Pledging Jewelry.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 max-w-3xl w-full justify-center">
          {/* Button for Buyer Sign Up */}
          <Link
            to="/auth/signup-customer" // Redirects to CustomerSignUp
            className="inline-block px-16 py-3 text-lg font-raleway text-black bg-white border shadow-md transition duration-300 hover:bg-black hover:text-white"
          >
            Buy
          </Link>

          {/* Button for Seller Sign Up */}
          <Link
            to="/auth/signup-jeweller" // Redirects to JewellerSignUp
            className="inline-block px-16 py-3 text-lg font-raleway text-black bg-white border shadow-md transition duration-300 hover:bg-black hover:text-white"
          >
            Sell
          </Link>

          {/* Button for Broker Sign Up */}
          <Link
            to="/auth/signup-pawnbroker" // Redirects to PawnBrokerSignUp
            className="inline-block px-16 py-3 text-lg font-raleway text-black bg-white border  shadow-md transition duration-300 hover:bg-black hover:text-white"
          >
            Pledge
          </Link>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-16 px-4 h-full md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* CTA Button */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-3xl text-gray-800 font-raleway mb-4">
            Key Features of Our Platform
          </h2>
          <p className="text-lg text-gray-700 mb-6 font-raleway">
            Explore a wide selection of jewelry, sell or pawn your own pieces,
            and enjoy secure transactions with personalized recommendations.
          </p>
          <button className="inline-block px-16 py-3 mt-12 text-lg font-raleway font-medium text-white bg-black border-2 border-transparent transition duration-300 hover:bg-white hover:text-black hover:border-black">
            Get Started Now
          </button>
        </div>

        {/* Feature Cards Grid on the Right */}
        <div className="flex md:w-2/3 justify-end">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 w-full md:w-auto">
            {/* Feature Card 1 */}
            <div
              className="relative bg-white shadow-lg p-6 font-raleway transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundImage: `url(${paperbg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 0,
              }}
            >
              <FaGem className="text-4xl text-gray-700 mb-4" />
              <h3 className="text-3xl font-raleway text-black">
                Explore and Buy Jewelry
              </h3>
              <p className="mt-2 text-sm text-black">
                Browse a diverse collection of jewelry items from multiple
                stores and find the perfect piece for any occasion.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div
              className="relative bg-white shadow-lg p-6 font-raleway transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundImage: `url(${paperbg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 0,
              }}
            >
              <FaExchangeAlt className="text-4xl text-gray-700 mb-4" />
              <h3 className="text-3xl font-raleway text-black">
                Sell or Pawn Your Jewelry
              </h3>
              <p className="mt-2 text-sm text-black">
                Easily list your own jewelry for sale or pawn, connect directly
                with stores, and receive offers.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div
              className="relative bg-white shadow-lg p-6 font-raleway transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: `url(${paperbg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 0,
              }}
            >
              <FaComments className="text-4xl text-gray-700 mb-4" />
              <h3 className="text-3xl font-raleway text-black">
                Direct Communication
              </h3>
              <p className="mt-2 text-sm text-black">
                Communicate securely with buyers and sellers, negotiate deals,
                and enjoy safe, seamless transactions.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div
              className="relative bg-white shadow-lg p-6 font-raleway transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: `url(${paperbg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 0,
              }}
            >
              <FaUserCircle className="text-4xl text-gray-700 mb-4" />
              <h3 className="text-3xl font-raleway text-black">
                Personalized Experience
              </h3>
              <p className="mt-2 text-sm text-black">
                Receive tailored jewelry recommendations based on your
                preferences and browsing history for a customized shopping
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// How it Works
const OperationBox = ({ title, description, icon }) => (
  <div
    className="bg-white shadow-lg w-80 h-72 m-4 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-105" // Added transition and scale on hover
    style={{
      backgroundImage: `url(${paperbg})`, // Set the paperbg image for each card
      backgroundSize: "cover", // Cover the entire box
      backgroundPosition: "center", // Center the image
    }}
  >
    <div className="flex flex-col items-center text-center p-6 font-raleway">
      {/* Centered flex container */}
      <div className="text-gray-700 text-4xl mb-2 flex items-center justify-center">
        {" "}
        {/* Changed icon color to gray-700 */}
        {icon}
      </div>
      <h3 className="text-2xl font-raleway mb-2">{title}</h3>{" "}
      {/* Updated font for the heading */}
      <p className="text-gray-600 mb-0">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="relative">
      <div
        className="relative bg-cover bg-center h-96 flex items-center justify-center flex-col"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h2 className="relative text-white text-4xl md:text-6xl z-10 text-start font-raleway">
          How Our Platform <span className="text-yellow-500">Operates</span>
        </h2>
        <p className="relative text-white text-lg md:text-xl z-10 mt-2 text-center font-raleway">
          Discover the seamless process of buying, selling, and pawning jewelry.
        </p>
      </div>

      {/* Container for Operation Boxes */}
      <div className="max-w-6xl mx-auto py-10 flex flex-col items-center relative z-20 -mt-32">
        {/* Adjusted negative margin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <OperationBox
            title="Step 1: Sign Up"
            description="Create an account to get started and access all our features."
            icon={<FaUserPlus />}
          />
          <OperationBox
            title="Step 2: Browse Jewelry"
            description="Explore a vast selection of jewelry from various sellers."
            icon={<FaSearch />}
          />
          <OperationBox
            title="Step 3: Make Transactions"
            description="Buy, sell, or pawn jewelry seamlessly through our secure platform."
            icon={<FaMoneyBillWave />}
          />
          <OperationBox
            title="Step 4: Direct Communication"
            description="Communicate directly with sellers or buyers for negotiations."
            icon={<FaComments />}
          />
          <OperationBox
            title="Step 5: Get Recommendations"
            description="Receive personalized jewelry recommendations tailored to your preferences."
            icon={<FaBell />}
          />
          <OperationBox
            title="Step 6: Enjoy Secure Transactions"
            description="All transactions are secure and protected for your peace of mind."
            icon={<FaLock />}
          />
        </div>
        <button className="inline-block px-16 py-3 mt-12 text-lg font-raleway font-medium text-white bg-black border-2 border-transparent transition duration-300 hover:bg-white hover:text-black hover:border-black">
          Watch Tutorial
        </button>
      </div>
    </section>
  );
};

// Shop by jewellery type
const ShopByJewelleryType = () => {
  const jewelleryTypes = [
    { name: "Rings", image: typeRings },
    { name: "Necklace", image: typeNecklace },
    { name: "Earrings", image: typeEarrings },
    { name: "Bracelet", image: typeBracelet },
  ];

  return (
    <section className="py-16 bg-gray-100 font-raleway">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-12 text-gray-800">
          Shop by Jewellery Type
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {jewelleryTypes.map((type) => (
            <div key={type.name} className="flex flex-col items-center px-4">
              <img
                src={type.image}
                alt={type.name}
                className="w-60 h-60 object-cover" // Removed rounded-lg here
              />
              <p className="text-lg mt-2">{type.name}</p>
            </div>
          ))}
        </div>
        <button className="inline-block px-16 py-3 mt-12 text-lg font-raleway font-medium text-white bg-black border-2 border-transparent transition duration-300 hover:bg-white hover:text-black hover:border-black">
          View All
        </button>
      </div>
    </section>
  );
};

//Highlighted Listings
const HighlightedListings = () => {
  const listings = [
    {
      title: "Featured Ring",
      image: highlightedImage1,
      description: "A stunning diamond ring that adds elegance to any outfit.",
    },
    {
      title: "Elegant Necklace",
      image: highlightedImage2,
      description: "An exquisite necklace designed to enhance your beauty.",
    },
    {
      title: "Stylish Earrings",
      image: highlightedImage3,
      description:
        "Chic earrings that are perfect for both casual and formal occasions.",
    },
  ];

  return (
    <section className="py-16 bg-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl text-gray-800 font-raleway mb-4">
          Highlighted Listings
        </h2>
        <p className="text-lg text-gray-700 mb-8 font-raleway">
          Explore our curated selection of exquisite jewelry pieces that stand
          out.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {listings.map((listing) => (
            <div key={listing.title} className="flex flex-col items-center">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-48 object-cover"
                style={{ borderRadius: 0 }} // No rounded corners
              />
              <h3 className="text-2xl font-raleway mt-4 text-black">
                {listing.title}
              </h3>
              <p className="text-gray-600 mt-2 font-raleway text-base">
                {listing.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

//Subscription Plans
const SubscriptionPlans = () => {
  const cardDetails = [
    {
      title: "Basic Subscription",
      description:
        "Essential features at an affordable price for individuals just getting started.",
      price: "₹499/month",
      buttonText: "Login",
      buttonStyle: "bg-blue-600 hover:bg-blue-700", // Blue for Basic plan
      features: [
        "Access to basic features",
        "Community support",
        "Monthly updates",
        "Secure account management",
        "Access on all devices",
      ],
    },
    {
      title: "Pro Subscription",
      description:
        "Advanced features for better performance, perfect for growing businesses.",
      price: "₹999/month",
      buttonText: "Start Free Trial",
      buttonStyle: "bg-green-600 hover:bg-green-700", // Green for Pro plan
      features: [
        "Everything in Basic",
        "Priority support",
        "Weekly updates",
        "Custom analytics dashboard",
        "Collaborative tools",
      ],
    },
    {
      title: "Blog",
      description:
        "Tailored for large teams, providing premium features and dedicated support.",
      price: "₹1999/month",
      buttonText: "Contact Us",
      buttonStyle: "bg-gray-800 hover:bg-gray-900", // Dark gray for Blog
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security features",
        "24/7 support",
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto text-center">
        {/* Headings */}
        <h2 className="text-5xl text-black mb-8 font-raleway">
          Our Subscription Plans
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardDetails.map((card, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-white shadow-sm transition-transform transform hover:scale-105"
              style={{ borderRadius: 0 }} // Sharp edges, no rounded corners
            >
              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black font-raleway">
                  {card.title}
                </h3>
                <p className="text-sm mt-2 text-gray-600 font-raleway">
                  {card.description}
                </p>
                <div className="my-4 text-2xl font-bold text-blue-600 font-raleway">
                  {card.price}
                </div>
                <ul className="space-y-1 text-gray-600 font-raleway">
                  {card.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-blue-600"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* Unique Button below the features */}
                <button className="inline-block px-32 py-3 mt-12 text-lg font-raleway font-medium text-white bg-black border-2 border-transparent transition duration-300 hover:bg-white hover:text-black hover:border-black">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// LandingPage Component that includes both Navbar, HeroSection, and Features
const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <HowItWorks />
      <ShopByJewelleryType />
      <HighlightedListings />
      <SubscriptionPlans />
    </div>
  );
};

export default LandingPage;
