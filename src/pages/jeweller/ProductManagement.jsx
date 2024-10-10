// src/pages/jeweller/ProductManagement.jsx

import React, { useState, useEffect } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline'; // Import close icon from Heroicons v2
import JewellerCreateProducts from "./JewellerCreateProducts"; // Import the Create component
import JewellerEditProducts from "./JewellerEditProducts"; // Import the Edit component
import { fetchAllProducts, deleteProduct } from "../../api/jewellerAPI"; // Import the fetch function

const ProductManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [products, setProducts] = useState([]); // State to hold the products
  const [loading, setLoading] = useState(true); // State for loading status
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the product to edit
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOption, setSortOption] = useState("dateAsc"); // State for sorting option

  const openCreateProductModal = () => {
    setSelectedProduct(null); // Clear selected product for creating new product
    setIsCreateModalOpen(true);
  };

  const openEditProductModal = (product) => {
    setSelectedProduct(product); // Set selected product for editing
    setIsEditModalOpen(true);
  };

  const closeCreateProductModal = () => {
    setIsCreateModalOpen(false);
  };

  const closeEditProductModal = () => {
    setIsEditModalOpen(false);
  };

  // Fetch all products function
  const fetchProducts = async () => {
    try {
      const fetchedProducts = await fetchAllProducts(); // Call the API function
      setProducts(fetchedProducts); // Set the products state with fetched data
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId); // Call delete function from API
      setProducts(products.filter(product => product.id !== productId)); // Update state to remove deleted product
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  // Search and sort products
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "dateAsc":
          return new Date(a.addedDate) - new Date(b.addedDate); // Sort by date ascending
        case "dateDesc":
          return new Date(b.addedDate) - new Date(a.addedDate); // Sort by date descending
        case "priceAsc":
          return a.price - b.price; // Sort by price ascending
        case "priceDesc":
          return b.price - a.price; // Sort by price descending
        default:
          return 0;
      }
    });

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  return (
    <div className="container mx-auto p-6 font-raleway">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-4"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="dateAsc">Sort by Date Ascending</option>
            <option value="dateDesc">Sort by Date Descending</option>
            <option value="priceAsc">Sort by Price Low to High</option>
            <option value="priceDesc">Sort by Price High to Low</option>
          </select>
        </div>
        <button
          onClick={openCreateProductModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md text-sm transition duration-150"
        >
          Create Product
        </button>
      </div>

      {loading ? ( // Show loading state
        <div className="text-center py-4">Loading products...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-500 via-blue-500 to-black">
                <th className="p-4 text-left text-md font-medium text-white">Name</th>
                <th className="p-4 text-left text-md font-medium text-white">Description</th>
                <th className="p-4 text-left text-md font-medium text-white">Price</th>
                <th className="p-4 text-center text-md font-medium text-white">Actions</th> {/* Center align Actions heading */}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b transition hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-800">{product.name}</td>
                    <td className="p-4 text-sm text-gray-800">{product.description}</td>
                    <td className="p-4 text-sm text-gray-800">₹{product.price}</td>
                    <td className="p-4 text-center"> {/* Center align Action buttons */}
                      <button 
                        onClick={() => openEditProductModal(product)}
                        className="bg-gray-300 text-gray-800 py-1 px-3 rounded-md text-sm hover:bg-gray-400 transition duration-300">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-300 text-white py-1 px-3 rounded-md text-sm hover:bg-red-400 transition duration-300 ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-600">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Product Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white shadow-lg w-full max-w-6xl h-[600px] relative">
            <button
              onClick={closeCreateProductModal}
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-800"
            >
              <XMarkIcon className="h-6 w-6" /> {/* Close icon */}
            </button>

            <div className="overflow-y-auto h-full pt-8">
              <JewellerCreateProducts onClose={closeCreateProductModal} onProductCreated={fetchProducts} />
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white shadow-lg w-full max-w-6xl h-[600px] relative">
            <button
              onClick={closeEditProductModal}
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-800"
            >
              <XMarkIcon className="h-6 w-6" /> {/* Close icon */}
            </button>

            <div className="overflow-y-auto h-full pt-8">
              <JewellerEditProducts 
                product={selectedProduct} 
                onClose={closeEditProductModal} 
                onProductUpdated={fetchProducts} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
