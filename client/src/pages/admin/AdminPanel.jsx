import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    else if (activeTab === "restaurants") fetchRestaurants();
    else fetchOrders();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("/admin/restaurants/pending");
      setRestaurants(res.data);
    } catch (err) {
      alert("Failed to fetch restaurants");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      alert("Failed to fetch orders");
    }
  };

  const approveRestaurant = async (id) => {
    try {
      await axios.put(`/admin/restaurants/${id}/approve`);
      fetchRestaurants();
    } catch (err) {
      alert("Approval failed");
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      await axios.delete(`/admin/restaurants/${id}`);
      fetchRestaurants();
    } catch (err) {
      alert("Deletion failed");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("restaurants")}>Restaurants</button>
        <button onClick={() => setActiveTab("orders")}>Orders</button>
      </div>

      <div className="tab-content">
        {activeTab === "users" && (
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "restaurants" && (
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map(r => (
                <tr key={r._id}>
                  <td>{r.name}</td><td>{r.email}</td>
                  <td>
                    <button onClick={() => approveRestaurant(r._id)}>✅ Approve</button>
                    <button onClick={() => deleteRestaurant(r._id)}>❌ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "orders" && (
          <table>
            <thead>
              <tr>
                <th>Customer</th><th>Total</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td>{o.customer?.name}</td>
                  <td>₹{o.totalAmount}</td>
                  <td>{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
