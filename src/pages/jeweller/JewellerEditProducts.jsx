import React, { useState, useEffect } from "react";
import {
  editProduct,
  ArticleType,
  uploadProductImage,
  deleteProductImage,
  fetchProductImages,
} from "../../api/jewellerAPI"; // Import the necessary functions
import { fetchCategories, fetchSubcategories } from "../../api/adminAPI"; // Import fetch functions

const JewellerEditProducts = ({ product, onClose, onProductUpdated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [type, setType] = useState(ArticleType.OTHER); // Default type
  const [customType, setCustomType] = useState("");
  const [categories, setCategories] = useState([]); // State for categories
  const [subcategories, setSubcategories] = useState([]); // State for subcategories
  const [images, setImages] = useState([]); // State for product images

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    loadCategories();

    if (product) {
      // Set product data
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryId(product.categoryId);
      setSubcategoryId(product.subcategoryId);
      setType(product.type);
      setCustomType(product.customType || "");

      // Fetch subcategories for the product's category
      const fetchSubcategoriesForProduct = async () => {
        if (product.categoryId) {
          try {
            const fetchedSubcategories = await fetchSubcategories(
              product.categoryId
            );
            setSubcategories(fetchedSubcategories);
          } catch (error) {
            console.error("Failed to fetch subcategories:", error);
          }
        }
      };

      fetchSubcategoriesForProduct();

      // Fetch images for the product
      const fetchImagesForProduct = async () => {
        if (product.id) {
          try {
            const fetchedImages = await fetchProductImages(product.id);
            console.log("Fetched Images Response:", fetchedImages); // Log response for debugging

            // Assuming the API response has an `images` array with `imageUrl`
            if (fetchedImages && Array.isArray(fetchedImages.images)) {
              setImages(
                fetchedImages.images.map((image) => ({
                  id: image.id,
                  url: image.imageUrl, // Map image URL properly
                }))
              );
            } else {
              console.error(
                "Fetched images are not in the expected format:",
                fetchedImages
              );
              setImages([]); // Fallback to an empty array if the format is wrong
            }
          } catch (error) {
            console.error("Error fetching images:", error);
            setImages([]); // Handle error case
          }
        }
      };

      fetchImagesForProduct();
    }
  }, [product]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await uploadProductImage(product.id, file);
        // Fetch updated images
        const updatedImages = await fetchProductImages(product.id);
        // Update state with new images
        if (Array.isArray(updatedImages.images)) {
          setImages(
            updatedImages.images.map((image) => ({
              id: image.id,
              url: image.imageUrl, // Correct the field for image URL
            }))
          );
        }
      } catch (error) {
        console.error("Failed to upload image:", error.message);
      }
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await deleteProductImage(product.id, imageId);
      // Fetch updated images
      const updatedImages = await fetchProductImages(product.id);
      // Update state with new images
      if (Array.isArray(updatedImages.images)) {
        setImages(
          updatedImages.images.map((image) => ({
            id: image.id,
            url: image.imageUrl, // Correct the field for image URL
          }))
        );
      }
    } catch (error) {
      console.error("Failed to delete image:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated product data
    const productData = {
      name,
      description,
      price,
      categoryId,
      subcategoryId,
      type,
      customType,
    };

    try {
      await editProduct(product.id, productData); // Call the editProduct function
      onProductUpdated(); // Notify the parent component to refresh products
      onClose(); // Close the edit modal
    } catch (error) {
      console.error("Failed to update product:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-lg font-bold mb-4">Edit Product</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubcategoryId(""); // Reset subcategory when category changes
          }}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Subcategory</label>
        <select
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Type</option>
          {Object.values(ArticleType).map((articleType) => (
            <option key={articleType} value={articleType}>
              {articleType}
            </option>
          ))}
        </select>
      </div>
      {type === ArticleType.OTHER && ( // Conditional rendering for Custom Type
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Custom Type (Optional)
          </label>
          <input
            type="text"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Upload New Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Existing Images</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.url}
                alt={`Product Image ${image.id}`}
                className="w-full h-auto object-cover"
              />
              <button
                onClick={() => handleImageDelete(image.id)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default JewellerEditProducts;
