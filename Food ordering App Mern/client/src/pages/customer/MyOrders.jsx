import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/customer/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to load orders", err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Orders</h2>

      {orders.length === 0 ? (
        <p style={styles.empty}>No orders placed yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={styles.card}>
            <div style={styles.header}>
              <span><strong>Order ID:</strong> {order._id}</span>
              <span><strong>Status:</strong> <span style={styles.status(order.status)}>{order.status}</span></span>
            </div>

            <div style={styles.date}>
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </div>

            <div style={styles.restaurant}>
              <strong>Restaurant:</strong> {order.restaurant?.name || "Unknown"}
            </div>

            <ul style={styles.itemList}>
              {order.items.map((item, index) => (
                <li key={index} style={styles.item}>
                  <span>{item.product?.name}</span>
                  <span>₹{item.product?.price} × {item.quantity}</span>
                </li>
              ))}
            </ul>

            <div style={styles.total}>
              <strong>Total:</strong> ₹{order.totalAmount}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px 40px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  empty: {
    fontSize: "16px",
    color: "#777",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    marginBottom: "20px",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "14px",
    color: "#333",
  },
  date: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "10px",
  },
  restaurant: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "15px",
  },
  itemList: {
    listStyle: "none",
    paddingLeft: 0,
    marginBottom: "15px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px",
    padding: "6px 0",
    borderBottom: "1px solid #eee",
  },
  total: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "right",
    color: "#000",
  },
  status: (status) => ({
    padding: "2px 8px",
    borderRadius: "6px",
    backgroundColor:
      status === "Placed"
        ? "#ffc107"
        : status === "Preparing"
        ? "#17a2b8"
        : status === "Out for Delivery"
        ? "#007bff"
        : "#28a745",
    color: "#fff",
    fontSize: "12px",
    textTransform: "uppercase",
  }),
};

export default MyOrders;
