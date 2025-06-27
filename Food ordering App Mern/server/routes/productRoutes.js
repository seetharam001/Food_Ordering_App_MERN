// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ Public route: Get popular products (dishes)
router.get('/popular', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch popular dishes', error: err.message });
  }
});

module.exports = router;
