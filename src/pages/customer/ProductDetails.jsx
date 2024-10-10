import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchProductImages } from "../../api/jewellerAPI"; // Import fetch images function
import { fetchCategories, fetchSubcategories } from "../../api/adminAPI"; // Import fetch functions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "../../api/customerAPI"; // Import the addToCart function
import CustomerNavbar from "./CustomerNavbar";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state; // Access the product from state
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [quantity, setQuantity] = useState(1); // State to manage quantity

  useEffect(() => {
    const getProductImages = async () => {
      try {
        const imagesResponse = await fetchProductImages(product.id); // Fetch images for the product
        setImages(imagesResponse.images.map((image) => image.imageUrl)); // Assuming images contains imageUrl
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    const getCategoriesAndSubcategories = async () => {
      try {
        // Fetch categories first
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse); // Assuming it returns an array of categories

        // Fetch subcategories for the specific category of the product
        if (product.categoryId) {
          const subcategoriesResponse = await fetchSubcategories(
            product.categoryId
          ); // Pass categoryId
          setSubcategories(subcategoriesResponse); // Assuming it returns an array of subcategories
        }
      } catch (error) {
        console.error("Error fetching categories or subcategories:", error);
      }
    };

    if (product) {
      getProductImages();
      getCategoriesAndSubcategories();
    }
  }, [product]);

  // Function to get category name by ID
  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "N/A"; // Return category name or "N/A" if not found
  };

  // Function to get subcategory name by ID
  const getSubcategoryName = (id) => {
    const subcategory = subcategories.find((sub) => sub.id === id);
    return subcategory ? subcategory.name : "N/A"; // Return subcategory name or "N/A" if not found
  };

  // Function to handle adding to cart
  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity); // Call the addToCart function
      alert("Product added to cart successfully!"); // Notify user of success
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart."); // Notify user of failure
    }
  };

  return (
    <>
      <CustomerNavbar />
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row">
          {/* Image Gallery */}
          <div className="md:w-1/2">
            <div className="relative w-full mb-4" style={{ paddingTop: '100%' }}> {/* 1:1 Aspect Ratio */}
              {images.length > 0 ? (
                <img
                  src={images[0]} // Display the first image of the product
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
              ) : (
                <p>No images available for this product.</p>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="md:w-1/2 md:pl-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-gray-800">
              ₹{product.price}
            </p>

            {/* Category and Subcategory */}
            <p className="mt-4 text-sm text-gray-500">
              Category: {getCategoryName(product.categoryId)}
            </p>
            <p className="text-sm text-gray-500">
              Subcategory: {getSubcategoryName(product.subcategoryId)}
            </p>

            {/* Quantity Input */}
            <div className="mt-4">
              <label className="block text-sm text-gray-700">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)} // Update quantity
                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center">
              <button
                onClick={handleAddToCart} // Handle add to cart action
                className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Additional Images Section */}
        <h2 className="text-2xl font-semibold mt-6">Additional Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4"> {/* Smaller images */}
          {images.length > 1 ? (
            images.slice(1).map((image, index) => (
              <div key={index} className="relative w-full" style={{ paddingTop: '100%' }}> {/* 1:1 Aspect Ratio */}
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))
          ) : (
            <p>No additional images available for this product.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
