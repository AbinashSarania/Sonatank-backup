// src/pages/JewelleryTypes/JewelleryTypes.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import "rc-slider/assets/index.css"; // Import for the slider
import Slider from "rc-slider";
import { fetchAllProducts } from "../../api/customerAPI"; // Import your fetch function
import { fetchProductImages } from "../../api/jewellerAPI"; // Import your fetch images function
import { fetchCategories } from "../../api/adminAPI"; // Import fetch categories function

const JewelleryTypes = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({}); // State to store images for each product
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [priceRange, setPriceRange] = useState([0, 5000]); // Default price range for the slider

  useEffect(() => {
    const getProductsAndCategories = async () => {
      try {
        const productResponse = await fetchAllProducts(); // Fetch products
        
        // Check if products are defined and set products state
        if (productResponse && productResponse.products) {
          setProducts(productResponse.products); // Set products state

          // Fetch images for each product
          const imagePromises = productResponse.products.map(async (product) => {
            const imagesResponse = await fetchProductImages(product.id);
            console.log(`Images for product ${product.id}:`, imagesResponse.images);
            
            return {
              id: product.id,
              images: imagesResponse.images.map((image) => image.imageUrl),
            }; // Store image URLs by product ID
          });

          const imagesArray = await Promise.all(imagePromises);
          const imagesMap = imagesArray.reduce((acc, { id, images }) => {
            acc[id] = images; // Create a map of product IDs to their images
            return acc;
          }, {});

          setProductImages(imagesMap); // Set product images state
        } else {
          console.error("No products found in the response");
        }

        // Fetch categories
        const categoryResponse = await fetchCategories(); // Fetch categories
        if (categoryResponse) {
          setCategories(categoryResponse); // Set categories state
        } else {
          console.error("No categories found in the response");
        }
      } catch (error) {
        console.error("Error fetching products, images, or categories:", error);
      }
    };

    getProductsAndCategories();
  }, []);

  // Update handleProductClick to pass the entire product object
  const handleProductClick = (product) => {
    navigate(`/customer/product-details`, { state: { product } });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    // If "All Categories" is selected, clear selected categories
    if (value === "") {
      setSelectedCategories([]); // Show all products
    } else {
      setSelectedCategories([value]); // Filter by selected category
    }
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const filteredAndSortedProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(product.categoryId.toString()) // Filter based on categoryId
        : true
    )
    .filter(
      (product) =>
        parseFloat(product.price) >= priceRange[0] &&
        parseFloat(product.price) <= priceRange[1]
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? parseFloat(a.price) - parseFloat(b.price)
        : parseFloat(b.price) - parseFloat(a.price)
    );

  return (
    <section className="h-screen py-16 bg-gray-100">
      <div className="max-w-screen-lg mx-auto text-center px-4 h-full">
        {/* Search, Filter, and Sort Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-8">
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-300 pb-1 w-full md:w-1/3">
            <FontAwesomeIcon icon={faSearch} className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full md:w-1/3">
            <select
              value={selectedCategories[0] || ""}
              onChange={handleCategoryChange}
              className="border border-gray-300 bg-white hover:bg-gray-200 px-4 py-2 rounded-md w-full transition-colors duration-300"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col w-full md:w-1/3">
            <span className="text-gray-700 mb-2">Price Range</span>
            <Slider
              range
              min={0}
              max={5000} // Update based on your data
              step={100}
              defaultValue={priceRange}
              value={priceRange}
              onChange={handleSliderChange}
              trackStyle={{ backgroundColor: "#4F46E5" }}
              handleStyle={{ borderColor: "#4F46E5" }}
            />
            <div className="flex justify-between mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className="relative group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              onClick={() => handleProductClick(product)} // Pass the entire product object
            >
              {/* Product Images */}
              {productImages[product.id] && productImages[product.id].length > 0 ? (
                <img
                  src={productImages[product.id][0]} // Display the first image of the product
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-t-lg"
                />
              ) : (
                <img
                  src="path/to/default/image.jpg" // Default image if no images are available
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-t-lg"
                />
              )}

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black rounded-lg bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300">
                <FontAwesomeIcon
                  icon={faEye}
                  className="w-12 h-12 text-white"
                />
              </div>

              {/* Product Name, Price, Description & Category */}
              <div className="p-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {product.name}
                </p>
                <p className="text-gray-500 mb-2">
                  ₹{parseFloat(product.price).toFixed(2)}
                </p>

                {/* Displaying the category name */}
                <p className="text-sm text-gray-500 mt-1">
                  Category:{" "}
                  {categories.find((cat) => cat.id === product.categoryId)
                    ?.name || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JewelleryTypes;
