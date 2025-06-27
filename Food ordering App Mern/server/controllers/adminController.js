const User = require('../models/User');
const Order = require('../models/Order');

// ✅ Get all pending restaurants
const getPendingRestaurants = async (req, res) => {
  try {
    const pending = await User.find({ role: 'restaurant', approved: false });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending restaurants' });
  }
};

// ✅ Approve a restaurant
const approveRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await User.findById(id);
    if (!restaurant || restaurant.role !== 'restaurant') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.approved = true;
    await restaurant.save();
    res.json({ message: 'Restaurant approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Approval failed' });
  }
};

// ✅ Delete a restaurant (reject)
const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await User.findById(id);
    if (!restaurant || restaurant.role !== 'restaurant') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await restaurant.deleteOne();
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed' });
  }
};

// ✅ Admin - View all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

// ✅ Admin - Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status', error: err.message });
  }
};

// ✅ Update Order Status (Admin)
const adminUpdateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated by admin', status: order.status });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};


module.exports = {
  getPendingRestaurants,
  approveRestaurant,
  deleteRestaurant,
  getAllOrders,
  updateOrderStatus,
  adminUpdateOrderStatus,
  getAllUsers,
};
