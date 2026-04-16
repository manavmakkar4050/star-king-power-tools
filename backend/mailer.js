const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,  // Gmail App Password
  },
});

async function sendOrderConfirmation({ to, name, orderId, items, total, deliveryAddress }) {
  const itemRows = items.map(i =>
    `<tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.qty || i.quantity || 1}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${((i.price) * (i.qty || i.quantity || 1)).toLocaleString('en-IN')}</td>
    </tr>`
  ).join('');

  const addr = deliveryAddress || {};
  const addressText = [addr.street, addr.area, addr.city, addr.state, addr.pincode].filter(Boolean).join(', ');

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px">
    <div style="background:#0f3d0f;padding:24px;text-align:center;border-radius:8px 8px 0 0">
      <h1 style="color:#2ecc40;margin:0;font-size:28px;letter-spacing:2px">STAR KING</h1>
      <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">POWER TOOLS</p>
    </div>
    <div style="background:#fff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e0e0e0">
      <h2 style="color:#0f3d0f;margin-top:0">Order Confirmed! ✅</h2>
      <p>Hi <strong>${name}</strong>, thank you for your order. We've received it and it's being processed.</p>
      <div style="background:#f0faf0;border-left:4px solid #2ecc40;padding:12px 16px;border-radius:4px;margin:20px 0">
        <strong>Order ID:</strong> SK-${String(orderId).slice(-8)}
      </div>
      <h3 style="color:#0f3d0f">Order Summary</h3>
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:#f0faf0">
            <th style="padding:10px;text-align:left">Product</th>
            <th style="padding:10px;text-align:center">Qty</th>
            <th style="padding:10px;text-align:right">Amount</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:12px;font-weight:bold;text-align:right">Total:</td>
            <td style="padding:12px;font-weight:bold;text-align:right;color:#1a7a1a">₹${parseFloat(total).toLocaleString('en-IN')}</td>
          </tr>
        </tfoot>
      </table>
      ${addressText ? `<h3 style="color:#0f3d0f">Delivery Address</h3><p style="color:#555">${addressText}</p>` : ''}
      <p style="color:#888;font-size:13px;margin-top:24px">Expected delivery: 3–5 working days. For support, call <strong>1800 102 0375</strong> or email <strong>customercare@starkingpowertools.com</strong></p>
    </div>
    <p style="text-align:center;color:#aaa;font-size:12px;margin-top:16px">© 2025 Star King Power Tools Pvt. Ltd., Ludhiana</p>
  </div>`;

  try {
    await transporter.sendMail({
      from: `"Star King Power Tools" <${process.env.MAIL_USER}>`,
      to,
      subject: `Order Confirmed — SK-${String(orderId).slice(-8)} | Star King Power Tools`,
      html,
    });
  } catch (err) {
    console.error('Email send failed:', err.message);
    // Don't throw — email failure shouldn't break the order
  }
}

module.exports = { sendOrderConfirmation };
