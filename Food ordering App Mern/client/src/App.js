import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import "./components/Navbar.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin
import AdminPanel from "./pages/admin/AdminPanel";

// Restaurant
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import AddProduct from "./pages/restaurant/AddProduct";
import ManageProducts from "./pages/restaurant/ManageProducts";
import Orders from "./pages/restaurant/Orders";

// Customer
import RestaurantsPage from "./pages/customer/RestaurantsPage";
import RestaurantMenu from "./pages/customer/RestaurantMenu";
import CartPage from "./pages/customer/CartPage";
import MyOrders from "./pages/customer/MyOrders";

// Utilities
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute role="admin"><AdminPanel /></PrivateRoute>} />

        {/* Restaurant Routes */}
        <Route path="/restaurant" element={<PrivateRoute role="restaurant"><RestaurantDashboard /></PrivateRoute>} />
        <Route path="/restaurant/add" element={<PrivateRoute role="restaurant"><AddProduct /></PrivateRoute>} />
        <Route path="/restaurant/manage" element={<PrivateRoute role="restaurant"><ManageProducts /></PrivateRoute>} />
        <Route path="/restaurant/orders" element={<PrivateRoute role="restaurant"><Orders /></PrivateRoute>} />

        {/* Customer Routes */}
        <Route path="/customer/home" element={<PrivateRoute role="customer"><RestaurantsPage /></PrivateRoute>} />
        <Route path="/customer/restaurant/:id" element={<PrivateRoute role="customer"><RestaurantMenu /></PrivateRoute>} />
        <Route path="/customer/cart" element={<PrivateRoute role="customer"><CartPage /></PrivateRoute>} />
        <Route path="/customer/orders" element={<PrivateRoute role="customer"><MyOrders /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
