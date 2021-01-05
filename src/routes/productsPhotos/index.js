
const express = require('express');
const productsPhotosController = require('../../controllers/productsPhotos');

const router = new express.Router();

router.get(
    '/:id',
    productsPhotosController.getPhotoById,
);

module.exports = router;
