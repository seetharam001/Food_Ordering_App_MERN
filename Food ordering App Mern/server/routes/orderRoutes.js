const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getCustomerOrders
} = require('../controllers/orderController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🛒 Place a new order
router.post('/', authMiddleware, roleMiddleware('customer'), placeOrder);

// 🧾 View customer's past orders
router.get('/my', authMiddleware, roleMiddleware('customer'), getCustomerOrders);

module.exports = router;
