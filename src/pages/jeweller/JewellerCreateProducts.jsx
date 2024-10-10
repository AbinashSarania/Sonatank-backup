import React, { useEffect, useState } from "react";
import {
  createProduct,
  ArticleType,
  uploadProductImage,
} from "../../api/jewellerAPI"; // Adjust the import path as needed
import { fetchCategories, fetchSubcategories } from "../../api/adminAPI"; // Adjust the import path as needed

const JewellerCreateProducts = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0.0,
    categoryId: "",
    subcategoryId: "",
    type: ArticleType.OTHER,
    customType: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError(err.message || "Failed to fetch categories.");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadSubcategories = async () => {
      if (formData.categoryId) {
        try {
          const fetchedSubcategories = await fetchSubcategories(
            formData.categoryId
          );
          setSubcategories(fetchedSubcategories);
        } catch (err) {
          setError(err.message || "Failed to fetch subcategories.");
        }
      } else {
        setSubcategories([]);
      }
    };
    loadSubcategories();
  }, [formData.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (imageFiles.length + files.length > 10) {
      setError("You can only upload a maximum of 10 images.");
      return;
    }
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
    setError("");
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createProduct(formData);
      console.log("Product created successfully:", result);

      await Promise.all(
        imageFiles.map((file) => uploadProductImage(result.id, file))
      );

      console.log("Images uploaded successfully.");

      setFormData({
        name: "",
        description: "",
        price: 0.0,
        categoryId: "",
        subcategoryId: "",
        type: ArticleType.OTHER,
        customType: "",
      });
      setImageFiles([]);
      setSubcategories([]);
    } catch (error) {
      console.error(
        "Failed to create product or upload images:",
        error.message
      );
      setError(error.message || "Failed to create product or upload images.");
    }
  };

  return (
    <div className="container mx-auto p-0 font-raleway">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white  px-10 py-8 space-y-6">
        {/* Product Name Field */}
        <div>
          <label
            className="block text-sm font-bold mb-2 text-gray-700"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="block w-full shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            className="block text-sm font-bold mb-2 text-gray-700"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            autoComplete="off"
            className="block w-full shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Price Field */}
        <div>
          <label
            className="block text-sm font-bold mb-2 text-gray-700"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            autoComplete="off"
            className="block w-full shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Category Field */}
        <div>
          <label
            className="block text-sm font-bold mb-2 text-gray-700"
            htmlFor="categoryId"
          >
            Category:
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            autoComplete="category"
            className="block w-full shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Field */}
        <div>
          <label
            className="block text-sm font-bold mb-2 text-gray-700"
            htmlFor="subcategoryId"
          >
            Subcategory:
          </label>
          <select
            id="subcategoryId"
            name="subcategoryId"
            value={formData.subcategoryId}
            onChange={handleChange}
            required
            autoComplete="off"
            className="block w-full shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type Field */}
        <div>
          <label
            className="block text-sm font-bold mb-2 text-gray-700"
            htmlFor="type"
          >
            Type:
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            autoComplete="off"
            className="block w-full shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {Object.values(ArticleType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Type Field (if applicable) */}
        {formData.type === ArticleType.OTHER && (
          <div>
            <label
              className="block text-sm font-bold mb-2 text-gray-700"
              htmlFor="customType"
            >
              Custom Type:
            </label>
            <input
              type="text"
              id="customType"
              name="customType"
              value={formData.customType}
              onChange={handleChange}
              required
              autoComplete="off"
              className="block w-full shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {/* Image Upload Field */}
        <div className="mt-4">
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Upload Images (max 10):
          </label>
          <div className="border-dashed border-2 border-gray-300 rounded-md p-4 flex flex-col items-center">
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" // Hide default file input
              id="file-upload" // ID for the custom file input
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Click to Upload or Drag and Drop
            </label>
            <p className="mt-2 text-gray-500 text-xs">
              {imageFiles.length} / 10 images selected
            </p>
          </div>

          {/* Image Preview Section */}
          {imageFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-bold mb-2 text-gray-700">
                Image Previews:
              </h3>
              <div className="flex flex-wrap space-x-2">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-full h-full rounded-md shadow"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-start mt-6">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md text-sm transition duration-150"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default JewellerCreateProducts;
