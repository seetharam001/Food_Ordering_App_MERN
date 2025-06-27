// server/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const {
    getApprovedRestaurants,
    getRestaurantMenu,
    getCustomerOrders,
    searchProducts
} = require('../controllers/customerController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔐 Customer-only
router.get('/restaurants', authMiddleware, roleMiddleware('customer'), getApprovedRestaurants);
router.get('/restaurants/:id/menu', authMiddleware, roleMiddleware('customer'), getRestaurantMenu);
router.get('/orders', authMiddleware, roleMiddleware('customer'), getCustomerOrders); // ⬅️ New route
router.get('/products/search', authMiddleware, roleMiddleware('customer'), searchProducts);

module.exports = router;
