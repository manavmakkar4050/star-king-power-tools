const express = require('express');
const router  = express.Router();
const { pool } = require('../db');
const { sendOrderConfirmation } = require('../mailer');

// POST /api/orders
router.post('/', async (req, res) => {
  const { user_id, customer_name, customer_email, customer_phone, items, subtotal, total, delivery_address } = req.body;
  if (!customer_name || !customer_email || !items || !total) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const id = Date.now();
    await pool.execute(
      'INSERT INTO orders (id, user_id, customer_name, customer_email, customer_phone, items, subtotal, total, delivery_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, user_id || null, customer_name, customer_email, customer_phone || '', JSON.stringify(items), subtotal, total, JSON.stringify(delivery_address || {})]
    );

    // Reduce stock for each ordered item
    for (const item of items) {
      if (item.id) {
        await pool.execute(
          'UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?',
          [item.quantity || item.qty || 1, item.id]
        );
      }
    }

    // Send confirmation email
    sendOrderConfirmation({ to: customer_email, name: customer_name, orderId: id, items, total, deliveryAddress: delivery_address });

    res.json({ success: true, orderId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Order failed' });
  }
});

// GET /api/orders/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.params.userId]);
    const orders = rows.map(o => ({ ...o, items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items }));
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch orders' });
  }
});

module.exports = router;
