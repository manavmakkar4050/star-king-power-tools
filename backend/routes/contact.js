const express = require('express');
const router  = express.Router();
const { pool } = require('../db');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required' });

  try {
    await pool.execute(
      'INSERT INTO contacts (id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)',
      [Date.now(), name, email, phone || '', message]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;
