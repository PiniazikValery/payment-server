const Payment = require('../../models/payment');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);

exports.postCharge = async (req, res) => {
  try {
    const payment = new Payment();
    const {amount, pMethodId, productId, paymentDetails} = req.body;

    const charge = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: pMethodId,
      confirm: true,
    });

    if (!charge) throw new Error('charge unsuccessful');

    const newPayment = {
      address: paymentDetails.address,
      city: paymentDetails.city,
      street: paymentDetails.street,
      zip: paymentDetails.zip,
      productId,
      stripePaymentId: charge.id,
    };
    await payment.createPayment(newPayment);

    res.status(200).json({
      message: 'charge posted successfully',
      charge,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
