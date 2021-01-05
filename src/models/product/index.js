const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

class Product {
  constructor() {
    this.product = mongoose.model('Product', ProductSchema);
  }

  createProduct(product, callback = () => {}) {
    this.product.create(product, (err) => callback(err));
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      this.product.find({}, (err, products) => {
        if (err) {
          reject(err);
        }
        resolve(products);
      });
    });
  }
}

module.exports = Product;
