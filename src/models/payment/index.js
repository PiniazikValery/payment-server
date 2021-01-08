const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  stripePaymentId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

class Payment {
  constructor() {
    this.payment = mongoose.model('Payment', PaymentSchema);
  }

  createPayment(payment, callback = () => {}) {
    this.payment.create(payment, (err) => callback(err));
  }
}

module.exports = Payment;
