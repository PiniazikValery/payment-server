/**
 * NPM Module dependencies.
 */
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const process = require('process');

/**
 * Project dependencies.
 */
const ProductsPhotos = require('./src/models/productsPhotos');
const productsPhotosRoutes = require('./src/routes/productsPhotos');
const productRoutes = require('./src/routes/products');
const {fillInWithDefaultPhotos, fillInWithDefaultProducts} =
 require('./src/scripts/db');

/**
 * Configure env
 */
if (process.env.NODE_ENV === undefined) {
  require('dotenv').config();
}

/**
 * Create Express server && Routes configuration.
 */
const app = express();
app.use('/products-photos', productsPhotosRoutes);
app.use('/product', productRoutes);

/**
 * Connect Mongoose to MongoDB.
 */
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on('error', (error) => {
  console.log(`Error with db: ${error}`);
});

connection.once('open', async () => {
  console.log('Server is connected to data base');
  app.locals.db = connection.db;
  const productsPhotos = new ProductsPhotos(connection.db);
  const loadedItems = await fillInWithDefaultPhotos(productsPhotos);
  loadedItems && fillInWithDefaultProducts(loadedItems);
});

/**
 * Start server
 */
const port = process.env.PORT || config.get('application_port');
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
