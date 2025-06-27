const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// ✅ Fetch all approved restaurants
const getApprovedRestaurants = async (req, res) => {
  try {
    const restaurants = await User.find({
      role: "restaurant",
      approved: true,
    }).select("name imageUrl _id"); // ✅ Only required fields

    res.status(200).json(restaurants);
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

// ✅ Fetch menu/products of a selected restaurant
const getRestaurantMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ restaurant: id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu', error: err.message });
  }
};

// ✅ Customer Order History (updated with restaurant population)
const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate('items.product', 'name price imageUrl')
      .populate('restaurant', 'name imageUrl') // ✅ populate restaurant
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

// ✅ Search products by keyword (name/category/restaurant)
const searchProducts = async (req, res) => {
  const { keyword } = req.query;

  try {
    const regex = new RegExp(keyword, 'i');

    const restaurants = await User.find({
      role: 'restaurant',
      name: regex,
      approved: true,
    }).select('_id');

    const restaurantIds = restaurants.map((r) => r._id);

    const products = await Product.find({
      $or: [
        { name: regex },
        { category: regex },
        { restaurant: { $in: restaurantIds } },
      ],
    }).populate('restaurant', 'name');

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};

module.exports = {
  getApprovedRestaurants,
  getRestaurantMenu,
  getCustomerOrders,
  searchProducts,
};
