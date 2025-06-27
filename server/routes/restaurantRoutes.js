const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // For image uploads
const { getMyProducts } = require('../controllers/restaurantController');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getRestaurantOrders,
  updateOrderStatus,
} = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const Product = require('../models/Product'); // ✅ Needed for public product fetch

// 🔐 Restaurant-only routes
router.post(
  '/products',
  authMiddleware,
  roleMiddleware('restaurant'),
  upload.single('image'),
  addProduct
);

router.put('/products/:id', authMiddleware, roleMiddleware('restaurant'), updateProduct);
router.delete('/products/:id', authMiddleware, roleMiddleware('restaurant'), deleteProduct);
router.get('/orders', authMiddleware, roleMiddleware('restaurant'), getRestaurantOrders);
router.put('/orders/:id/status', authMiddleware, roleMiddleware('restaurant'), updateOrderStatus);
router.get('/products', authMiddleware, roleMiddleware('restaurant'), getMyProducts);

// ✅ Public route: Get products of a specific restaurant (for customers)
router.get('/products/restaurant/:id', async (req, res) => {
  try {
    const products = await Product.find({ restaurant: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

module.exports = router;
