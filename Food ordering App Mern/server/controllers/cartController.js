// server/controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
const addToCart = async (req, res) => {
  const customerId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      cart = new Cart({ customer: customerId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to cart', error: err.message });
  }
};

// Get customer cart
const getCart = async (req, res) => {
  const customerId = req.user.id;

  try {
    const cart = await Cart.findOne({ customer: customerId }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const customerId = req.user.id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ customer: customerId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.json({ message: 'Item removed', cart });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item', error: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};
