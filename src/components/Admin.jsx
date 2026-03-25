 import React, { useState } from "react";
import "./Admin.css";
import axios from "axios";
import Searchbar from "./Searchbar";


const API = axios.create({
  baseURL: "http://localhost:5000/api/electronics"
});


const productConfig = {
  mobile: ["RAM", "Storage", "Camera", "Color"],
  laptop: ["RAM", "Processor", "Battery"],
  bangles: ["Color", "Size", "Material", "Weight"]
};

const Admin = () => {
  const [categoryType, setCategoryType] = useState("");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const resetForm = () => {
    setForm({});
    setCategoryType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      return alert("⚠️ Name & Price required");
    }

    if (!categoryType) {
      return alert("⚠️ Select Type");
    }

    
    const data = {
      name: form.name,
      price: Number(form.price), 
      description: form.description || "",
      categoryType: categoryType,

      RAM: form.RAM,
      Storage: form.Storage,
      Camera: form.Camera,
      Processor: form.Processor,
      Battery: form.Battery,

      Color: form.Color,
      Size: form.Size,
      Material: form.Material,
      Weight: form.Weight
    };

    console.log("📤 Sending Data:", data); 

    try {
      setLoading(true);

    
      await API.post("/", data);

      alert(" Product Added Successfully");
      resetForm();
    } catch (error) {
      console.error(" ERROR:", error);
      alert(" Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">

      <div className="admin-card">
        <h1 className="title">Add Product</h1>

        <form onSubmit={handleSubmit} className="form-section">

          <div className="grid">

        
            <div className="input-group full">
              <label>Category *</label>
              <select
                value={categoryType}
                onChange={(e) => {
                  setCategoryType(e.target.value);
                  setForm({});
                }}
              >
                <option value="">Select</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="bangles">Bangles</option>
              </select>
            </div>

            
            <div className="input-group">
              <label>Product Name *</label>
              <input
                value={form.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            
            <div className="input-group">
              <label>Price *</label>
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>

            
            <div className="input-group full">
              <label>Description</label>
              <textarea
                value={form.description || ""}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
              />
            </div>

      
            {categoryType &&
              productConfig[categoryType].map((field) => (
                <div className="input-group" key={field}>
                  <label>{field}</label>
                  <input
                    placeholder={`Enter ${field}`}
                    value={form[field] || ""}
                    onChange={(e) =>
                      handleChange(field, e.target.value)
                    }
                  />
                </div>
              ))}

          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Add Product"}
          </button>

        </form>
      </div>

      
      <div className="product-section">
        <Searchbar />
      </div>

    </div>
  );
};

export default Admin;