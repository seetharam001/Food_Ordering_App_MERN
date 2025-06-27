const Product = require('../models/Product');
const Order = require('../models/Order');

// ✅ Add Product with Image Upload (Cloudinary)
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const newProduct = new Product({
      restaurant: req.user.id,
      name,
      description,
      price,
      category,
      imageUrl: req.file?.path || '',
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};

// ✅ Edit Product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.restaurant.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};

// ✅ Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.restaurant.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};

// ✅ View Restaurant Orders (Includes Address + Customer Info)
const getRestaurantOrders = async (req, res) => {
  const restaurantId = req.user.id;

  try {
    const restaurantProducts = await Product.find({ restaurant: restaurantId }).select('_id');
    const productIds = restaurantProducts.map(p => p._id.toString());

    const orders = await Order.find({ 'items.product': { $in: productIds } })
      .populate('customer', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });

    const filteredOrders = orders.map(order => {
      const relevantItems = order.items.filter(item =>
        item.product.restaurant.toString() === restaurantId
      );
      return {
        ...order.toObject(),
        items: relevantItems
      };
    });

    res.json(filteredOrders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch restaurant orders', error: err.message });
  }
};

// ✅ Update Order Status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id).populate('items.product');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const belongsToRestaurant = order.items.some(
      item => item.product.restaurant.toString() === req.user.id
    );

    if (!belongsToRestaurant) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
};

// ✅ Get All Products by Restaurant
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ restaurant: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getRestaurantOrders,
  updateOrderStatus,
  getMyProducts
};
