const Cart = require('../models/Cart');
const Order = require('../models/Order');

// ✅ Place a new order from cart with address
const placeOrder = async (req, res) => {
  const customerId = req.user.id;
  const { address } = req.body;

  try {
    if (!address || address.trim() === '') {
      return res.status(400).json({ message: 'Address is required to place the order' });
    }

    const cart = await Cart.findOne({ customer: customerId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // ✅ Check if all products belong to the same restaurant
    const restaurantIds = new Set(cart.items.map(item => item.product.restaurant?.toString()));
    if (restaurantIds.size !== 1) {
      return res.status(400).json({ message: 'All items must be from the same restaurant' });
    }

    const restaurantId = [...restaurantIds][0];

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      customer: customerId,
      restaurant: restaurantId, // ✅ store restaurant
      items: orderItems,
      address,
      totalAmount
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

// ✅ View customer order history
const getCustomerOrders = async (req, res) => {
  const customerId = req.user.id;

  try {
    const orders = await Order.find({ customer: customerId })
      .populate('restaurant', 'name')              // ✅ add restaurant name
      .populate('items.product', 'name price imageUrl')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = {
  placeOrder,
  getCustomerOrders
};
