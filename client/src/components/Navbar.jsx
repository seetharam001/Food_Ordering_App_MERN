import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken, getRole } from "../utils/auth";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const role = getRole();
  const user = decodeToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!role || !user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2 className="logo">🥗 QuickBite</h2>
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      <div className={`navbar-links ${open ? "open" : ""}`}>
        {role === "admin" && (
          <Link to="/admin" onClick={() => setOpen(false)}>Dashboard</Link>
        )}
        {role === "restaurant" && (
          <>
            <Link to="/restaurant" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link to="/restaurant/add" onClick={() => setOpen(false)}>Add Product</Link>
            <Link to="/restaurant/manage" onClick={() => setOpen(false)}>Manage Products</Link>
            <Link to="/restaurant/orders" onClick={() => setOpen(false)}>Orders</Link>
          </>
        )}
        {role === "customer" && (
          <>
            <Link to="/customer/home" onClick={() => setOpen(false)}>Restaurants</Link>
            <Link to="/customer/cart" onClick={() => setOpen(false)}>Cart</Link>
            <Link to="/customer/orders" onClick={() => setOpen(false)}>My Orders</Link>
          </>
        )}

        <div className="navbar-right">
          <span className="user-info"> 👤 Welcome, <strong>{user?.name}</strong></span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
