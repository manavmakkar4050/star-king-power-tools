const express   = require('express');
const router    = express.Router();
const Razorpay  = require('razorpay');
const crypto    = require('crypto');
const { pool }  = require('../db');

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
// Creates a Razorpay order and returns the order_id to the frontend
router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  if (!amount) return res.status(400).json({ error: 'Amount is required' });

  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(amount * 100), // Razorpay expects paise
      currency,
      receipt:  receipt || `rcpt_${Date.now()}`,
    });
    res.json({ success: true, order: { ...order, key_id: process.env.RAZORPAY_KEY_ID } });
  } catch (err) {
    console.error('Razorpay create order error:', err);
    res.status(500).json({ error: 'Could not create payment order' });
  }
});

// POST /api/payment/verify
// Verifies Razorpay signature and saves the order to DB
router.post('/verify', async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    // order details
    user_id, customer_name, customer_email, customer_phone,
    items, subtotal, total, delivery_address
  } = req.body;

  // Verify signature
  const expectedSig = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSig !== razorpay_signature) {
    return res.status(400).json({ error: 'Payment verification failed' });
  }

  // Save order to DB
  try {
    const id = Date.now();
    await pool.execute(
      `INSERT INTO orders
        (id, user_id, customer_name, customer_email, customer_phone, items, subtotal, total, status, razorpay_order_id, razorpay_payment_id, delivery_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?, ?, ?)`,
      [
        id, user_id || null,
        customer_name, customer_email, customer_phone || '',
        JSON.stringify(items), subtotal, total,
        razorpay_order_id, razorpay_payment_id,
        JSON.stringify(delivery_address || {})
      ]
    );

    // Reduce stock for each ordered item
    for (const item of items) {
      if (item.id) {
        await pool.execute(
          'UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?',
          [item.quantity || 1, item.id]
        );
      }
    }

    res.json({ success: true, orderId: id });
  } catch (err) {
    console.error('Order save error:', err);
    res.status(500).json({ error: 'Payment verified but order save failed' });
  }
});

module.exports = router;
