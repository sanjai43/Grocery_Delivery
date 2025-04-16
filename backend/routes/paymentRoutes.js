const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key');
const Order = require('../models/Order');
const bodyParser = require('body-parser');
const router = express.Router();

// Define the webhook secret key
const endpointSecret = 'your_stripe_webhook_secret_key';

// Body parser middleware for Stripe webhook
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify the webhook signature and parse the event
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment intent
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Find the order and update its payment status
    Order.findOneAndUpdate(
      { 'paymentStatus': 'Pending', 'totalAmount': paymentIntent.amount_received / 100 },
      { paymentStatus: 'Paid' },
      { new: true } // Return the updated order
    ).exec()
      .then(updatedOrder => {
        console.log('Payment succeeded for order:', updatedOrder);
      })
      .catch(err => {
        console.error('Error updating order:', err);
      });
  }

  res.json({ received: true });  // Acknowledge receipt of the event
});

module.exports = router;
