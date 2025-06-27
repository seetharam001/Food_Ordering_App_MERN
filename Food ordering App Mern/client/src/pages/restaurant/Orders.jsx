import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetch = async () => {
    const res = await axios.get("/restaurant/orders");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/restaurant/orders/${id}/status`, { status });
    fetch();
  };

  useEffect(() => { fetch(); }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Placed": return "#6c757d";
      case "Preparing": return "#17a2b8";
      case "Out for Delivery": return "#ffc107";
      case "Delivered": return "#28a745";
      default: return "#6c757d";
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🍽️ Incoming Orders</h2>

      {orders.length === 0 ? (
        <p style={styles.empty}>No orders at the moment.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={styles.card}>
            <div style={styles.topRow}>
              <div>
                <div style={styles.customerBox}>
                  <span style={styles.label}>👤 Customer:</span>
                  <span style={styles.value}>{order.customer?.name || "Unknown"}</span>
                </div>
                <div style={styles.customerBox}>
                  <span style={styles.label}>📍 Address:</span>
                  <span style={styles.value}>{order.address}</span>
                </div>
              </div>
              <div style={{ ...styles.statusBadge, backgroundColor: getStatusColor(order.status) }}>
                {order.status}
              </div>
            </div>

            <ul style={styles.itemList}>
              {order.items.map(i => (
                <li key={i.product._id} style={styles.item}>
                  🍴 {i.product.name} × {i.quantity}
                </li>
              ))}
            </ul>

            <div style={styles.statusRow}>
              <span style={styles.label}>📦 Update Status:</span>
              <select
                onChange={(e) => updateStatus(order._id, e.target.value)}
                value={order.status}
                style={styles.select}
              >
                <option>Placed</option>
                <option>Preparing</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

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
    marginBottom: "30px",
    color: "#2c3e50",
    textAlign: "center",
  },
  empty: {
    fontSize: "16px",
    color: "#777",
    textAlign: "center",
    marginTop: "60px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    padding: "20px 24px",
    marginBottom: "25px",
    transition: "transform 0.2s ease",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  customerBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "4px",
  },
  label: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#444",
  },
  value: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#000",
  },
  statusBadge: {
    padding: "6px 14px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  itemList: {
    listStyle: "none",
    paddingLeft: "0",
    margin: "10px 0 15px",
  },
  item: {
    padding: "6px 0",
    fontSize: "15px",
    color: "#333",
    borderBottom: "1px dashed #eee",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "10px",
  },
  select: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
};

export default Orders;
