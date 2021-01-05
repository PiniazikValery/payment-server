const mongoose = require('mongoose');

class ProductsPhotos {
  constructor(db) {
    this.collectionName = 'productsPhotos';
    this.bucket;
    this.db = db;
  }
  getFilesCount() {
    return this.db.collection(`${this.collectionName}.files`).countDocuments();
  }
  getGridFsBucket() {
    if (!this.bucket) {
      this.bucket = new mongoose.mongo.GridFSBucket(this.db, {
        bucketName: this.collectionName,
      });
    }
    return this.bucket;
  }

  async getPictureByName(name) {
    const {_id} =
    await this.db.collection(
        `${this.collectionName}.files`).findOne({filename: name},
    );
    return this.getPictureById(_id);
  }

  getPictureById(id) {
    let photoID;
    try {
      photoID = new mongoose.Types.ObjectId(id);
    } catch (err) {
      throw err;
    }
    return this.getGridFsBucket().openDownloadStream(photoID);
  }
};

module.exports = ProductsPhotos;
