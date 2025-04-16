const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

// POST Create a new order (Demo payment, status set to 'Paid')
router.post('/', authMiddleware, async (req, res) => {
  const { items, totalAmount, address } = req.body;

  try {
    // Create the order (set payment status to 'Paid' directly for demo purposes)
    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      paymentStatus: 'Paid',  // Set payment status as 'Paid' in demo mode
      deliveryStatus: 'Processing',
      address
    });

    // Save the order
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

// GET all orders (for user/admin to see orders)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }); // Fetch orders for the logged-in user
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// PUT Update order delivery status (Demo, no real delivery management)
router.put('/:id/delivery-status', authMiddleware, async (req, res) => {
  const { deliveryStatus } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.deliveryStatus = deliveryStatus;  // Update delivery status
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error updating delivery status', error: err.message });
  }
});

module.exports = router;
