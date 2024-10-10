import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa"; // Import Font Awesome icons
import {
  createCategory,
  fetchCategories,
  deleteCategory,
  updateCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  fetchSubcategories,
} from "../../api/adminAPI";

const StoreManagement = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [modalData, setModalData] = useState({
    type: "category",
    open: false,
    editing: false,
    editingId: null,
    categoryId: null,
  });
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  // Fetch categories and their subcategories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const categoriesWithSubcategories = await Promise.all(
          data.map(async (category) => {
            const subcategories = await fetchSubcategories(category.id);
            return { ...category, subcategories: subcategories || [] };
          })
        );
        setCategories(categoriesWithSubcategories);
      } catch (error) {
        setMessage("Error loading categories.");
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  const handleModalOpen = (type, data = {}) => {
    setModalData({
      type,
      open: true,
      editing: !!data.id,
      editingId: data.id || null,
      categoryId: data.categoryId || null,
    });
    setFormData({
      name: data.name || "",
      description: data.description || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      setMessage("Both fields are required.");
      return;
    }

    try {
      const { type, editing, categoryId, editingId } = modalData;

      if (type === "category") {
        const action = editing ? updateCategory : createCategory;
        const updatedCategory = await action({ ...formData, id: editingId });

        setCategories((prev) =>
          editing
            ? prev.map((cat) =>
                cat.id === updatedCategory.id ? updatedCategory : cat
              )
            : [...prev, updatedCategory]
        );
      } else if (type === "subcategory") {
        const action = editing ? updateSubcategory : createSubcategory;

        if (!categoryId) {
          console.error("Category ID is missing for creating the subcategory.");
          setMessage("Error creating subcategory: Category ID is required.");
          return;
        }

        const subcategoryData = {
          name: formData.name,
          description: formData.description,
        };

        const updatedSubcategory = editing
          ? await action(categoryId, editingId, subcategoryData)
          : await action(categoryId, subcategoryData);

        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  subcategories: editing
                    ? cat.subcategories.map((sub) =>
                        sub.id === updatedSubcategory.id
                          ? updatedSubcategory
                          : sub
                      )
                    : [...cat.subcategories, updatedSubcategory],
                }
              : cat
          )
        );
      }

      closeModal();
      setMessage(
        `${type.charAt(0).toUpperCase() + type.slice(1)} ${
          editing ? "updated" : "created"
        } successfully!`
      );
    } catch (error) {
      console.error("Error saving:", error);
      setMessage(
        `Error saving ${modalData.type}: ${error.message || "Unknown error."}`
      );
    }
  };

  const closeModal = () => {
    setModalData({
      type: "category",
      open: false,
      editing: false,
      editingId: null,
      categoryId: null,
    });
    setFormData({ name: "", description: "" });
    setMessage("");
  };

  const handleDelete = async (id, type, categoryId = null) => {
    try {
      if (type === "category") {
        await deleteCategory(id);
        setCategories(categories.filter((cat) => cat.id !== id));
      } else {
        await deleteSubcategory(categoryId, id);
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  subcategories: cat.subcategories.filter(
                    (sub) => sub.id !== id
                  ),
                }
              : cat
          )
        );
      }
      setMessage(
        `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`
      );
    } catch (error) {
      console.error(error);
      setMessage(`Error deleting ${type}.`);
    }
  };

  const toggleSubcategories = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Store Management
      </h1>
      {message && (
        <p
          className={`mb-4 text-${
            message.includes("Error") ? "red" : "green"
          }-500`}
        >
          {message}
        </p>
      )}
      <button
        className="mb-4 p-2 bg-blue-700 text-white rounded-md"
        onClick={() => handleModalOpen("category")}
      >
        <FaPlus className="inline-block mr-2" /> Add Category
      </button>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 via-red-500 to-blue-500">
              <th className="py-3 px-6 text-left text-md font-medium text-white">
                Category Name
              </th>
              <th className="py-3 px-6 text-left text-md font-medium text-white">
                Description
              </th>
              <th className="py-3 px-6 text-right text-md font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <React.Fragment key={category.id}>
                <tr className="border-b transition hover:bg-gray-100">
                  <td className="py-3 px-6 text-sm font-semibold text-gray-800">
                    {category.name}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-800">
                    {category.description}
                  </td>
                  <td className="py-3 px-6 text-right">
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => handleModalOpen("category", category)}
                        className="text-blue-600 hover:text-blue-800 transition duration-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, "category")}
                        className="text-red-500 hover:text-red-700 transition duration-200"
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        onClick={() => toggleSubcategories(category.id)}
                        className="text-orange-500 hover:text-orange-700 transition duration-200"
                      >
                        {expandedCategories.includes(category.id) ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handleModalOpen("subcategory", {
                            categoryId: category.id,
                          })
                        }
                        className="text-purple-600 hover:text-purple-700 transition duration-200"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedCategories.includes(category.id) &&
                  (category.subcategories.length > 0 ? (
                    category.subcategories.map((subcategory) => (
                      <tr
                        key={subcategory.id}
                        className="bg-gray-50 border-b transition hover:bg-gray-100"
                      >
                        <td className="py-3 px-12 text-sm font-semibold text-gray-700">
                          {subcategory.name}
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-700">
                          {subcategory.description}
                        </td>
                        <td className="py-3 px-6 text-right">
                          <div className="flex justify-end space-x-4">
                            <button
                              onClick={() =>
                                handleModalOpen("subcategory", {
                                  ...subcategory,
                                  categoryId: category.id,
                                })
                              }
                              className="text-blue-600 hover:text-blue-800 transition duration-200"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(
                                  subcategory.id,
                                  "subcategory",
                                  category.id
                                )
                              }
                              className="text-red-500 hover:text-red-700 transition duration-200"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-gray-50">
                      <td
                        colSpan="3"
                        className="py-3 px-12 text-sm text-gray-700 text-center"
                      >
                        No subcategories available
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding/editing categories and subcategories */}
      {modalData.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {modalData.editing
                ? `Edit ${modalData.type}`
                : `Add ${modalData.type}`}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-4 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-md"
                >
                  {modalData.editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreManagement;
