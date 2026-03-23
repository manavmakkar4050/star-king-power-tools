const express = require('express');
const router  = express.Router();
const crypto  = require('crypto');
const { pool } = require('../db');

const hash = (p) => crypto.createHash('sha256').update(p).digest('hex');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  try {
    const id = Date.now();
    await pool.execute(
      'INSERT INTO users (id, name, email, phone, password) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, phone || '', hash(password)]
    );
    const [rows] = await pool.execute('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', [id]);
    res.json({ success: true, user: rows[0] });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Email already registered' });
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user   = rows[0];
    if (!user || user.password !== hash(password)) return res.status(401).json({ error: 'Invalid email or password' });

    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// PUT /api/auth/profile
router.put('/profile', async (req, res) => {
  const { id, name, phone } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'Missing fields' });

  try {
    await pool.execute('UPDATE users SET name = ?, phone = ? WHERE id = ?', [name, phone || '', id]);
    const [rows] = await pool.execute('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', [id]);
    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// PUT /api/auth/password
router.put('/password', async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  if (!id || !currentPassword || !newPassword) return res.status(400).json({ error: 'Missing fields' });
  if (newPassword.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    const user   = rows[0];
    if (!user || user.password !== hash(currentPassword)) return res.status(401).json({ error: 'Current password is incorrect' });

    await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hash(newPassword), id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Password update failed' });
  }
});

module.exports = router;
