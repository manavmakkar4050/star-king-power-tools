function getCart() {
  return JSON.parse(localStorage.getItem('starking_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('starking_cart', JSON.stringify(cart));
  updateCartBadge();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartContainer');

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="icon">🛒</div>
        <h3>Your Cart is Empty</h3>
        <p>Looks like you haven't added any tools yet.</p>
        <br>
        <a href="products.html" class="btn-primary">Browse Products</a>
      </div>`;
    document.getElementById('cartSummary').style.display = 'none';
    return;
  }

  document.getElementById('cartSummary').style.display = 'block';

  const rows = cart.map(item => {
    // Determine the correct image path
    let imagePath = item.image_url;
    if (!imagePath) {
      imagePath = item.images ? item.images[0] : '';
    }
    // Ensure path works from cart.html (in frontend folder)
    if (imagePath && !imagePath.startsWith('../') && !imagePath.startsWith('/')) {
      imagePath = '../' + imagePath;
    }
    
    return `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:12px">
          <img class="cart-item-img" src="${imagePath}" alt="${item.name}" />
          <div>
            <strong>${item.name}</strong>
            <div style="font-size:0.8rem;color:var(--text-muted)">${item.category}</div>
          </div>
        </div>
      </td>
      <td>₹${item.price.toLocaleString('en-IN')}</td>
      <td>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </td>
      <td><strong>₹${(item.price * item.qty).toLocaleString('en-IN')}</strong></td>
      <td><button class="remove-btn" onclick="removeItem(${item.id})" title="Remove">🗑️</button></td>
    </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <br>
    <button class="btn-secondary" onclick="clearCart()" style="color:var(--text-dark)">🗑️ Clear Cart</button>
  `;

  updateSummary(cart);
}

function updateSummary(cart) {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  document.getElementById('gst').textContent = `₹${gst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  document.getElementById('total').textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty < 1) cart = cart.filter(i => i.id !== id);
  }
  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
  showToast('Item removed from cart');
}

function clearCart() {
  if (confirm('Clear your entire cart?')) {
    saveCart([]);
    renderCart();
    showToast('Cart cleared');
  }
}

// Order Modal
document.getElementById('placeOrderBtn')?.addEventListener('click', () => {
  document.getElementById('orderModal').classList.add('open');
});

document.getElementById('cancelOrder')?.addEventListener('click', () => {
  document.getElementById('orderModal').classList.remove('open');
});

document.getElementById('confirmOrderBtn')?.addEventListener('click', async () => {
  const cart  = getCart();
  const name  = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const phone = document.getElementById('cPhone').value.trim();

  if (!name || !email) {
    showToast('Please fill in your name and email', true);
    return;
  }

  const subtotal   = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total      = subtotal * 1.18;
  const currentUser = localStorage.getItem('starking_currentUser');
  const userId     = currentUser ? JSON.parse(currentUser).id : null;

  try {
    const res  = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, customer_name: name, customer_email: email, customer_phone: phone, items: cart, subtotal, total })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('orderModal').classList.remove('open');
      saveCart([]);
      showToast(`🎉 Order #${data.orderId} placed! Thank you, ${name}!`);
      setTimeout(() => renderCart(), 500);
    } else {
      showToast(data.error || 'Order failed', true);
    }
  } catch {
    showToast('Network error. Please try again.', true);
  }
});

renderCart();
