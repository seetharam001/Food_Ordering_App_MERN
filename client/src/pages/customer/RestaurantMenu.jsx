import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState([]);
  const { id } = useParams();

 useEffect(() => {
  console.log("Restaurant ID:", id); // Check if this is correct
  console.log("Token:", localStorage.getItem("token")); // Check if token exists

  axios.get(`/customer/restaurants/${id}/menu`)
    .then(res => {
      console.log("✅ Menu fetched:", res.data);
      setMenu(res.data);
    })
    .catch(err => {
      console.error("❌ Failed to load menu:", err.response?.data || err.message);
    });
}, [id]);

  const addToCart = async (productId) => {
    try {
      await axios.post("/cart/add", { productId });
      alert("Added to cart");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Restaurant Menu</h2>
      <div style={styles.grid}>
        {menu.map(item => (
          <div
            key={item._id}
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/200x150?text=No+Image"}
              alt={item.name}
              style={styles.image}
            />
            <div style={styles.cardBody}>
              <h3 style={styles.title}>{item.name}</h3>
              <p style={styles.description}>{item.description}</p>
              <p style={styles.price}>₹{item.price}</p>
              <button
                style={styles.button}
                onClick={() => addToCart(item._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 60px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f5f7fa",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#2c3e50",
    textAlign: "center",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
  },
  card: {
    width: "260px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.25s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "170px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "5px 0 6px",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
    minHeight: "40px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#111",
    marginBottom: "12px",
  },
  button: {
    padding: "10px 0",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};

export default RestaurantMenu;
