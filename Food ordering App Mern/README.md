# 🍽️ QuickBite - MERN Food Ordering App

QuickBite is a full-stack food ordering web application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). It supports three user roles: **Admin**, **Restaurant**, and **Customer**, each with dedicated dashboards and features.

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login system
- Role-based redirection (Admin, Restaurant, Customer)
- Login, Register, Logout functionality

### 🧑‍🍳 Restaurant Features
- Add new food products (with image upload)
- View, Edit, Delete products
- View orders from customers
- Update order status (e.g., "Preparing", "Out for delivery")

### 🧑‍💼 Admin Features
- View and approve restaurants
- View all customers and restaurants
- View all orders placed in the system

### 👨‍🍽️ Customer Features
- Browse all approved restaurants
- View restaurant menu
- Add products to cart
- View and place orders
- Track previous orders in "My Orders"

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT, Bcrypt
- **File Upload:** Multer, Cloudinary
- **Dev Tools:** Postman, Nodemon

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quickbite-food-app.git
cd quickbite-food-app

cd server
npm install       # ⬅️ Installs all backend dependencies
npm run dev       # ⬅️ Starts the backend server on http://localhost:5000

cd ../client      # Go to client folder
npm install       # ⬅️ Installs React app dependencies
npm start         # ⬅️ Launches React frontend at http://localhost:3000

