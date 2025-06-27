import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const RestaurantDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    weeklyOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
  });

  const fetchStats = async () => {
    try {
      const [productRes, orderRes] = await Promise.all([
        axios.get("/restaurant/products"),
        axios.get("/restaurant/orders"),
      ]);

      const orders = orderRes.data;
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);

      const weeklyOrders = orders.filter(o => new Date(o.createdAt) >= weekAgo).length;
      const totalRevenue = orders
        .filter(o => o.status === "Delivered")
        .reduce((sum, o) => sum + o.totalAmount, 0);

      setStats({
        totalProducts: productRes.data.length,
        totalOrders: orders.length,
        weeklyOrders,
        pendingOrders: orders.filter(o => o.status !== "Delivered").length,
        deliveredOrders: orders.filter(o => o.status === "Delivered").length,
        totalRevenue,
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🍽️ Restaurant Dashboard</h2>
      <p style={styles.subtext}>Track your restaurant's performance</p>

      <div style={styles.grid}>
        <Card label="Total Products" value={stats.totalProducts} color="#17a2b8" />
        <Card label="Total Orders" value={stats.totalOrders} color="#007bff" />
        <Card label="Orders This Week" value={stats.weeklyOrders} color="#6610f2" />
        <Card label="Pending Orders" value={stats.pendingOrders} color="#ffc107" />
        <Card label="Delivered Orders" value={stats.deliveredOrders} color="#28a745" />
        <Card label="Revenue (₹)" value={stats.totalRevenue} color="#20c997" />
      </div>
    </div>
  );
};

const Card = ({ label, value, color }) => (
  <div style={{ ...styles.card, borderLeft: `6px solid ${color}` }}>
    <h3 style={styles.cardValue}>{value}</h3>
    <p style={styles.cardLabel}>{label}</p>
  </div>
);

const styles = {
  container: {
    padding: "40px 60px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#2c3e50",
  },
  subtext: {
    fontSize: "16px",
    marginBottom: "30px",
    color: "#555",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    flex: "1 1 240px",
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    textAlign: "left",
    transition: "transform 0.2s",
  },
  cardValue: {
    fontSize: "30px",
    fontWeight: "700",
    margin: "0 0 8px",
    color: "#333",
  },
  cardLabel: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
};

export default RestaurantDashboard;
