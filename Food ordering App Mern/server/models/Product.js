// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  imageUrl: String, // optional
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
