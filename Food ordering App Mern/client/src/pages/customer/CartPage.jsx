import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");

  const fetch = async () => {
    try {
      const res = await axios.get("/cart");
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`/cart/${id}`);
      fetch();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    try {
      await axios.post("/orders", { address });
      alert("Order placed!");
      setAddress("");
      fetch();
    } catch (err) {
      alert("Order failed");
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((c) => (
            <div key={c.product._id} style={styles.card}>
              <div style={styles.itemRow}>
                <div>
                  <h3 style={styles.title}>{c.product.name}</h3>
                  <p style={styles.detail}>
                    ₹{c.product.price} × {c.quantity}
                  </p>
                </div>
                <button
                  style={styles.removeBtn}
                  onClick={() => remove(c.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={styles.total}>
            <strong>Total: ₹{calculateTotal()}</strong>
          </div>

          <textarea
            placeholder="Enter delivery address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.addressBox}
          />

          <button style={styles.placeBtn} onClick={placeOrder}>
            Place Order
          </button>
        </>
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
    marginBottom: "15px",
    padding: "15px 20px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "18px",
    color: "#222",
  },
  detail: {
    margin: 0,
    fontSize: "14px",
    color: "#555",
  },
  removeBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "13px",
  },
  total: {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "right",
    marginTop: "25px",
    marginBottom: "10px",
  },
  addressBox: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "15px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    resize: "vertical",
  },
  placeBtn: {
    display: "block",
    width: "100%",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 0",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default CartPage;
