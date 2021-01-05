const ProductPhotos = require('../../models/productsPhotos');

exports.getPhotoById = (req, res) => {
  const productPhotos = new ProductPhotos(req.app.locals.db);
  const downloadStream = productPhotos.getPictureById(req.params.id);
  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
};
