import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [popularDishes, setPopularDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restRes = await axios.get("/customer/restaurants");
        setRestaurants(restRes.data);

        const allDishes = [];

        for (const rest of restRes.data) {
          const prodRes = await axios.get(`/restaurant/products/restaurant/${rest._id}`);
          allDishes.push(
            ...prodRes.data.map(p => ({
              ...p,
              restaurantName: rest.name,
              restaurantId: rest._id, // ⭐️ Needed for navigation
            }))
          );
        }

        setPopularDishes(allDishes.slice(0, 10));
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      {/* ⭐ Popular Dishes Section */}
      <h2 style={styles.heading}>⭐ Popular Dishes</h2>
      {popularDishes.length === 0 ? (
        <p style={styles.empty}>No popular dishes to display.</p>
      ) : (
        <div style={styles.dishGrid}>
          {popularDishes.map((dish) => (
            <div
              key={dish._id}
              style={styles.dishCard}
              onClick={() => navigate(`/customer/restaurant/${dish.restaurantId}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
              }}
            >
              <img
                src={dish.imageUrl || "https://via.placeholder.com/250x150?text=No+Image"}
                alt={dish.name}
                style={styles.dishImage}
              />
              <h5 style={styles.dishName}>🍴 {dish.name}</h5>
              <p style={styles.dishPrice}>₹{dish.price}</p>
              <p style={styles.dishRest}>from <b>{dish.restaurantName}</b></p>
            </div>
          ))}
        </div>
      )}

      {/* 🏪 Explore Restaurants Section */}
      <h2 style={{ ...styles.heading, marginTop: "60px" }}>🍽️ Explore Restaurants</h2>
      <div style={styles.grid}>
        {restaurants.map((r) => (
          <div
            key={r._id}
            onClick={() => navigate(`/customer/restaurant/${r._id}`)}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.08)";
            }}
          >
            <img
              src={r.imageUrl || "https://via.placeholder.com/250x150?text=Restaurant"}
              alt={r.name}
              style={styles.image}
            />
            <h4 style={styles.name}>{r.name}</h4>
            {r.description && <p style={styles.description}>{r.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 60px",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #eef2f3, #f9fbfd)",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "38px",
    marginBottom: "40px",
    color: "#1c1c1c",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: "0.6px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
  },
  empty: {
    fontSize: "18px",
    textAlign: "center",
    color: "#aaa",
    marginTop: "30px",
    fontStyle: "italic",
  },
  dishGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "35px",
    justifyContent: "center",
  },
  dishCard: {
    width: "240px",
    background: "rgba(255, 255, 255, 0.92)",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "center",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
    cursor: "pointer",
    transition: "transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",
    backdropFilter: "blur(12px)",
    border: "1px solid #e4e4e4",
    overflow: "hidden",
  },
  dishImage: {
    width: "100%",
    height: "145px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "12px",
    pointerEvents: "none",
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.3s ease-in-out",
  },
  dishName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2b2b2b",
    marginBottom: "6px",
  },
  dishPrice: {
    fontSize: "15px",
    color: "#4a4a4a",
    fontWeight: "500",
    marginBottom: "4px",
  },
  dishRest: {
    fontSize: "13px",
    color: "#888",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "35px",
    justifyContent: "center",
    marginTop: "30px",
  },
  card: {
    width: "275px",
    background: "#ffffff",
    borderRadius: "20px",
    cursor: "pointer",
    textAlign: "center",
    padding: "22px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.09)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",
    border: "1px solid #eaeaea",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "170px",
    objectFit: "cover",
    borderRadius: "14px",
    marginBottom: "15px",
    pointerEvents: "none",
    border: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease-in-out",
  },
  name: {
    fontSize: "21px",
    fontWeight: "700",
    color: "#333",
    margin: "0 0 10px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    padding: "0 12px",
    minHeight: "52px",
    lineHeight: "1.5",
  },
};

export default RestaurantsPage;
