const express = require('express');
const router  = express.Router();
const { pool } = require('../db');
const path = require('path');
const fs = require('fs');

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch users' });
  }
});

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = rows.map(o => ({
      ...o,
      items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
      delivery_address: typeof o.delivery_address === 'string' ? JSON.parse(o.delivery_address) : o.delivery_address
    }));
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch orders' });
  }
});

// PUT /api/admin/orders/:id/status (also support PATCH)
router.put('/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update order status' });
  }
});

// PATCH /api/admin/orders/:id/status
router.patch('/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update order status' });
  }
});

// GET /api/admin/products
router.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
    const products = rows.map(p => ({
      ...p,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images
    }));
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

// POST /api/admin/products
router.post('/products', async (req, res) => {
  const { model, name, category, price, description, images } = req.body;
  try {
    const id = Date.now();
    await pool.execute(
      'INSERT INTO products (id, model, name, category, price, description, images) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, model, name, category, price, description || '', JSON.stringify(images || [])]
    );
    res.json({ success: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not add product' });
  }
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete product' });
  }
});

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [[{ total_orders }]] = await pool.execute('SELECT COUNT(*) as total_orders FROM orders');
    const [[{ total_revenue }]] = await pool.execute('SELECT COALESCE(SUM(total), 0) as total_revenue FROM orders');
    const [[{ total_customers }]] = await pool.execute('SELECT COUNT(*) as total_customers FROM users');
    const [[{ total_products }]] = await pool.execute('SELECT COUNT(*) as total_products FROM products');
    res.json({ total_orders, total_revenue, total_customers, total_products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch stats' });
  }
});

// POST /api/admin/seed-products — seed DB from products-data.json
router.post('/seed-products', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../frontend/products-data.json');
    const { products } = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let inserted = 0;
    for (const p of products) {
      const [existing] = await pool.execute('SELECT id FROM products WHERE id = ?', [p.id]);
      if (existing.length === 0) {
        await pool.execute(
          'INSERT INTO products (id, model, name, category, price, description, images) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [p.id, p.name, p.name, p.category, p.price, p.description || '', JSON.stringify([p.image_url || ''])]
        );
        inserted++;
      }
    }
    res.json({ success: true, inserted, total: products.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not seed products' });
  }
});

module.exports = router;
