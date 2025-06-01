import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const ProductForm = ({ onProductAdded = () => { } }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", category: "", subcategory: "", price: "", stock: 0, active: "", images: [] });
  const [errorMessage, setErrorMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFiles = (files) => {
    const imageFiles = Array.from(files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...imageFiles] }));
  };

  const handleImageUpload = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Send product data first
      const productResponse = await axios.post("/api/products", {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        active: formData.active === "true"
      }, config);

      const productId = productResponse.data._id;
      if (!productId) throw new Error("Failed to create product.");

      // Upload images to Cloudinary after product creation
      if (formData.images.length > 0) {
        for (const image of formData.images) {
          const imageData = new FormData();
          imageData.append("image", image);
          try {
            await axios.post(`/api/products/${productId}/upload`, imageData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          } catch (uploadError) {
            setErrorMessage(`Image upload failed: ${uploadError.response?.data?.error || uploadError.message}`);
            return;
          }
        }
      }

      setFormData({ name: "", category: "", subcategory: "", price: "", stock: 0, active: "", images: [] });
      if (fileInputRef.current) fileInputRef.current.value = null;
      onProductAdded(); // Refresh product list (if a callback is provided)
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Error submitting product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 max-w-[1300px] mx-auto px-[10vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border var(--text-color-dark); -300 rounded p-2"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border var(--text-color-dark); -300 rounded p-2"
          >
            <option value="">Select Category</option>
            <option value="Desert">Desert</option>
            <option value="Mountain">Mountain</option>
            <option value="Tropical">Tropical</option>
            <option value="Forest">Forest</option>
          </select>
        </div>

        {formData.category && (
          <div>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
              className="w-full border var(--text-color-dark); -300 rounded p-2"
            >
              <option value="">Select Subcategory</option>
              {formData.category === "Desert" &&
                ["Cacti", "Succulents", "Dry Flowers"].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              {formData.category === "Mountain" &&
                ["Evergreens", "Alpine Flowers"].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              {formData.category === "Tropical" &&
                ["Palms", "Orchids", "Ferns"].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              {formData.category === "Forest" &&
                ["Maples", "Pine", "Birch"].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
              className="ww-full border var(--text-color-dark); -300 rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Qty in Stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="ww-full border var(--text-color-dark); -300 rounded p-2"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">List in Catalog?</label>
          <select
            name="active"
            value={formData.active}
            onChange={handleChange}
            required
            className="ww-full border var(--text-color-dark); -300 rounded p-2 mb-8"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className={`border-2 border-dashed p-4 mb-4 text-center cursor-pointer ${dragOver ? 'border-blue-500' : 'border-gray-300'} h-40 flex items-center justify-center`}
        >
          {formData.images.length > 0 ? (
            <p className="text-medm">
              {formData.images.length} image(s) selected. Click or drag-drop to add more.
            </p>
          ) : (
            <h3 className="text-med">
              Drag and drop images here, or click to select files
            </h3>
          )}
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />

        <div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Product
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </form>
  );
};

export default ProductForm;
