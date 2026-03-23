const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:     process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  waitForConnections: true,
  connectionLimit: 10,
});

async function initDB() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id         BIGINT PRIMARY KEY,
      name       VARCHAR(255) NOT NULL,
      email      VARCHAR(255) UNIQUE NOT NULL,
      phone      VARCHAR(50),
      password   VARCHAR(64) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id                   BIGINT PRIMARY KEY,
      user_id              BIGINT,
      customer_name        VARCHAR(255) NOT NULL,
      customer_email       VARCHAR(255) NOT NULL,
      customer_phone       VARCHAR(50),
      items                JSON NOT NULL,
      subtotal             DECIMAL(10,2) NOT NULL,
      total                DECIMAL(10,2) NOT NULL,
      status               VARCHAR(50) DEFAULT 'pending',
      razorpay_order_id    VARCHAR(100),
      razorpay_payment_id  VARCHAR(100),
      delivery_address     JSON,
      created_at           DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         BIGINT PRIMARY KEY,
      name       VARCHAR(255) NOT NULL,
      email      VARCHAR(255) NOT NULL,
      phone      VARCHAR(50),
      message    TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Database tables ready');
}

module.exports = { pool, initDB };
