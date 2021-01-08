
const express = require('express');
const stripeController = require('../../controllers/stripe');

const router = new express.Router();

router.post(
    '/charge',
    stripeController.postCharge,
);

module.exports = router;
