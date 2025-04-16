const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: { type: String, required: true } ,
  category: { type: String, required: true },     // e.g., "Fruits", "Vegetables"
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 1
  },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
