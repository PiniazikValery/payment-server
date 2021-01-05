/**
 * NPM Module dependencies.
 */
const fs = require('fs');
const process = require('process');
const path = require('path');
const mongoose = require('mongoose');
const defaultProducts = require('../../../defaultData/products.json');
const Product = require('../../models/product');

async function fillInWithDefaultPhotos(productsPhotos) {
  if (!await productsPhotos.getFilesCount()) {
    const bucket = productsPhotos.getGridFsBucket();
    let readStreams = [];
    let uploadStreams = [];
    const dirToMove =
    `${path.dirname(require.main.filename)}/defaultData/productPhotos`;
    readStreams = await new Promise((resolve) => {
      fs.readdir(dirToMove, function(err, files) {
        if (err) {
          console.error('Could not list the directory.', err);
          process.exit(1);
        }
        resolve(files.map(function(file) {
          return {
            file,
            promise: fs.createReadStream(`${dirToMove}/${file}`),
          };
        }));
      });
    }); ;
    uploadStreams = readStreams.map((stream) => new Promise((resolve) => {
      const uploadStream = bucket.openUploadStream(stream.file);
      const id = uploadStream.id;
      stream.promise.pipe(uploadStream);
      uploadStream.on('finish', () => {
        resolve({id, file: stream.file});
      });
    }));
    return await Promise.all(uploadStreams);
  }
}

function fillInWithDefaultProducts(products) {
  new Product().createProduct(defaultProducts.data.map((product) => ({
    ...product,
    photo: new mongoose.Types.ObjectId(
        products.find((_product) => _product.file === product.photo).id)})),
  );
}

module.exports = {
  fillInWithDefaultPhotos,
  fillInWithDefaultProducts,
};
