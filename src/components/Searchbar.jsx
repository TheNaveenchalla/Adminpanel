 import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Searchbar.css";

const Searchbar = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");


   useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/electronics");

      console.log("API RESPONSE ", res.data);

      
      const allProducts = [
        ...(res.data.mobile || []),
        ...(res.data.laptop || []),
        ...(res.data.bangles || [])
      ];

      setProducts(allProducts);

    } catch (error) {
      console.error(" Error:", error);
    }
  };

  fetchProducts();
}, []);
  
  const filteredProducts = products.filter((p) => {
    const name = p.name?.toLowerCase() || "";
    const type = p.categoryType?.toLowerCase() || "";

    const matchesSearch =
      name.includes(query.toLowerCase()) ||
      type.includes(query.toLowerCase());

    const matchesFilter =
      filter === "all" || type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="shop-container">

      
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

  
      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>

        <button
          onClick={() => setFilter("mobile")}
          className={filter === "mobile" ? "active" : ""}
        >
          Mobile
        </button>

        <button
          onClick={() => setFilter("laptop")}
          className={filter === "laptop" ? "active" : ""}
        >
          Laptop
        </button>

        <button
          onClick={() => setFilter("bangles")}
          className={filter === "bangles" ? "active" : ""}
        >
          Bangles
        </button>
      </div>

  
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((p) => (
           
            <div className="product-card" key={p._id}>
  <div className="product-info">

    <h3 className="product-name">{p.name}</h3>

    <p className="price">₹{p.price}</p>

    <span className="badge">{p.categoryType}</span>

    {/* DESCRIPTION */}
    {p.description && (
      <p className="desc">{p.description}</p>
    )}

    {/* 🔥 FULL DETAILS */}
    <div className="specs">

      {/* 📱 MOBILE */}
      {p.RAM && <span>📱 RAM: {p.RAM}GB</span>}
      {p.Storage && <span>💾 {p.Storage}GB</span>}
      {p.Camera && <span>📸 {p.Camera}</span>}

      {/* 💻 LAPTOP */}
      {p.Processor && <span>⚙️ {p.Processor}</span>}
      {p.Battery && <span>🔋 {p.Battery}</span>}

      {/* 💍 BANGLES */}
      {p.Color && <span>🎨 {p.Color}</span>}
      {p.Size && <span>📏 Size: {p.Size}</span>}
      {p.Material && <span>🧱 {p.Material}</span>}
      {p.Weight && <span>⚖️ {p.Weight}</span>}

    </div>
 

  </div>
</div>
          ))
        )}
      </div>

    </div>
  );
};

export default Searchbar;