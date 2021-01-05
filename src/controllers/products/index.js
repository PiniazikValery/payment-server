const Product = require('../../models/product');

exports.getProducts = async (req, res) => {
  const product = new Product();
  try {
    const listOfProducts = await product.getProducts();
    res.status(200).json({
      data: listOfProducts,
    });
  } catch (err) {
    res.status(500).json({
      error_message: err.message,
    });
  }
};
