import React, { useState } from "react";
import axios from "../../api/axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "", image: null
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));

    try {
      await axios.post("/restaurant/products", data);
      alert("✅ Product added!");
      setForm({ name: "", description: "", price: "", category: "", image: null });
      setPreview(null);
    } catch (err) {
      alert("❌ Add failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add Product</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <FormField label="Product Name" type="text" name="name" value={form.name} onChange={handleChange} />
          <FormField label="Price (₹)" type="number" name="price" value={form.price} onChange={handleChange} />
          <FormField label="Category" type="text" name="category" value={form.category} onChange={handleChange} />
          <FormTextArea label="Description" name="description" value={form.description} onChange={handleChange} />

          <div style={styles.field}>
            <label style={styles.label}>Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={styles.fileInput}
            />
            {preview && (
              <img src={preview} alt="Preview" style={styles.previewImage} />
            )}
          </div>

          <button type="submit" style={styles.button}>Add Product</button>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ label, ...rest }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <input {...rest} style={styles.input} />
  </div>
);

const FormTextArea = ({ label, ...rest }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <textarea {...rest} style={styles.textarea} rows={4}></textarea>
  </div>
);

const styles = {
  container: {
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: "50px 20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "500px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "6px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    resize: "vertical",
    outline: "none",
  },
  fileInput: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  previewImage: {
    marginTop: "12px",
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default AddProduct;
