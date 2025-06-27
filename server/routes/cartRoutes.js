// server/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/add', authMiddleware, roleMiddleware('customer'), addToCart);
router.get('/', authMiddleware, roleMiddleware('customer'), getCart);
router.delete('/:productId', authMiddleware, roleMiddleware('customer'), removeFromCart);

module.exports = router;
