import React from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa"; // Icons for cart and delete actions

const Favorites = () => {
  const favorites = [
    {
      id: 1,
      item: "Gold Earrings",
      price: "$500",
      image: "https://via.placeholder.com/150", // Placeholder image for now
    },
    {
      id: 2,
      item: "Gold Pendant",
      price: "$750",
      image: "https://via.placeholder.com/150", // Placeholder image for now
    },
    {
      id: 3,
      item: "Gold Chain",
      price: "$1,200",
      image: "https://via.placeholder.com/150", // Placeholder image for now
    },
  ];

  return (
    <div className="mx-auto p-6 font-raleway">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={fav.image}
              alt={fav.item}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {fav.item}
              </h2>
              <p className="text-gray-600 mb-4">{fav.price}</p>
              <div className="flex justify-between items-center">
                {/* Add to Cart Button */}
                <button className="flex items-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                {/* Remove from Favorites Button */}
                <button className="text-red-500 hover:text-red-600 transition-colors duration-200">
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
