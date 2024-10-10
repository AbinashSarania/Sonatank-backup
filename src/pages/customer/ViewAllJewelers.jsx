import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ViewAllJewelers = () => {
  // Hardcoded data for jewelers
  const jewelers = [
    {
      id: 1,
      name: "Shiny Jewels",
      logo: "https://static.vecteezy.com/system/resources/previews/011/144/540/non_2x/jewelry-ring-abstract-logo-template-design-with-luxury-diamonds-or-gems-isolated-on-black-and-white-background-logo-can-be-for-jewelry-brands-and-signs-free-vector.jpg", // Replace with actual logo URLs
    },
    {
      id: 2,
      name: "Goldsmith's Haven",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK21NKLAy0o_XRRQ-0l9li8swiwvSqOFki1Lhunv5VAP7sbzWrILbB6u_lMhdvSl7DC3U&usqp=CAU",
    },
    {
      id: 3,
      name: "Earring Emporium",
      logo: "https://img.freepik.com/premium-vector/golden-minimalist-ornamental-logo_633982-145.jpg",
    },
    {
      id: 4,
      name: "Elegant Gems",
      logo: "https://st5.depositphotos.com/23232678/66432/v/450/depositphotos_664328882-stock-illustration-jewelry-vector-logo-design-abstract.jpg",
    },
    {
      id: 5,
      name: "Precious Metals",
      logo: "https://st3.depositphotos.com/33106018/34759/v/450/depositphotos_347592308-stock-illustration-golden-circle-frame-luxury-boutique.jpg",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Filter jewelers based on the search term
  const filteredJewelers = jewelers.filter((jeweler) =>
    jeweler.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle jeweler click to navigate
  const handleJewelerClick = (id) => {
    // Navigate to the JewelleryTypes route
    navigate("/customer/jewellery-types");
  };

  return (
    <div className="font-raleway p-8 bg-gray-50 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Explore Our Jewelers
      </h1>

      {/* Search Input with FontAwesome icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center border-b border-gray-300 pb-1 w-1/2 md:w-1/3">
          <FontAwesomeIcon icon={faSearch} className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Search for jewelers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredJewelers.map((jeweler) => (
          <div
            key={jeweler.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleJewelerClick(jeweler.id)} // Trigger navigation on click
          >
            <img
              src={jeweler.logo}
              alt={jeweler.name}
              className="w-24 h-24 object-cover rounded-full border border-gray-300 shadow-md mb-2"
            />
            <p className="text-lg font-semibold text-gray-800 text-center">
              {jeweler.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllJewelers;
