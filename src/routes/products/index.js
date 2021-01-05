
const express = require('express');
const productsController = require('../../controllers/products');

const router = new express.Router();

router.get(
    '/',
    productsController.getProducts,
);

module.exports = router;
