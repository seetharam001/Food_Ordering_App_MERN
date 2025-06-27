// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String },

  role: {
    type: String,
    enum: ['customer', 'restaurant', 'admin'],
    default: 'customer',
  },
  approved: {
    type: Boolean,
    default: function () {
      return this.role !== 'restaurant'; // only restaurants require approval
    },
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
