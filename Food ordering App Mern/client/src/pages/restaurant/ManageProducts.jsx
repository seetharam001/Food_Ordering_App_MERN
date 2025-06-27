import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetch = async () => {
    const res = await axios.get("/restaurant/products");
    setProducts(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/restaurant/products/${id}`);
    fetch();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Products</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} style={styles.row}>
                <td style={styles.td}>
                  <img src={p.imageUrl} alt={p.name} style={styles.image} />
                </td>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>₹{p.price}</td>
                <td style={styles.td}>
                  <button onClick={() => handleDelete(p._id)} style={styles.deleteBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 60px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f9fbfd",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "25px",
  },
  tableWrapper: {
    overflowX: "auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    borderRadius: "10px",
    background: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden",
  },
  headerRow: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#333",
    fontSize: "15px",
    borderBottom: "1px solid #ddd",
  },
  row: {
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#444",
    verticalAlign: "middle",
  },
  image: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};

export default ManageProducts;
