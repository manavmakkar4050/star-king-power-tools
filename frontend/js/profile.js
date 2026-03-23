// Profile Page (API-backed)

function checkAuth() {
  const currentUser = localStorage.getItem('starking_currentUser');
  if (!currentUser) { window.location.href = 'login.html'; return null; }
  return JSON.parse(currentUser);
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function loadProfile() {
  const user = checkAuth();
  if (!user) return;
  const initial = user.name.charAt(0).toUpperCase();
  document.getElementById('profileAvatar').textContent = initial;
  document.getElementById('profileName').textContent   = user.name;
  document.getElementById('profileEmail').textContent  = user.email;
  document.getElementById('profilePhone').textContent  = user.phone || '—';
  document.getElementById('editName').value  = user.name;
  document.getElementById('editPhone').value = user.phone || '';
}

async function loadOrders() {
  const user = checkAuth();
  if (!user) return;
  const container = document.getElementById('ordersContainer');

  try {
    const res    = await fetch(`/api/orders/user/${user.id}`);
    const orders = await res.json();

    if (!orders.length) {
      container.innerHTML = '<div class="empty-state">No orders yet. <a href="products.html">Start shopping!</a></div>';
      return;
    }

    container.innerHTML = orders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <span class="order-id">Order #${order.id}</span>
          <span class="order-date">${new Date(order.created_at).toLocaleDateString()}</span>
          <span class="order-status">${order.status}</span>
        </div>
        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <span>${item.name}</span>
              <span>₹${item.price.toLocaleString('en-IN')} × ${item.qty}</span>
            </div>`).join('')}
        </div>
        <div class="order-total">Total: ₹${order.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
      </div>`).join('');
  } catch {
    container.innerHTML = '<div class="empty-state">Could not load orders.</div>';
  }
}

// Edit profile
document.getElementById('editProfileBtn').addEventListener('click', () => {
  document.getElementById('editForm').style.display = 'block';
});
document.getElementById('cancelEditBtn').addEventListener('click', () => {
  document.getElementById('editForm').style.display = 'none';
});

document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const user  = checkAuth();
  if (!user) return;
  const name  = document.getElementById('editName').value.trim();
  const phone = document.getElementById('editPhone').value.trim();
  if (!name) return showToast('Name is required', 'error');

  try {
    const res  = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, name, phone })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('starking_currentUser', JSON.stringify(data.user));
      showToast('Profile updated!', 'success');
      document.getElementById('editForm').style.display = 'none';
      loadProfile();
    } else {
      showToast(data.error || 'Update failed', 'error');
    }
  } catch {
    showToast('Network error', 'error');
  }
});

// Change password
document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const user            = checkAuth();
  if (!user) return;
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword     = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmNewPassword').value;

  if (newPassword !== confirmPassword) return showToast('Passwords do not match', 'error');
  if (newPassword.length < 6) return showToast('Password must be at least 6 characters', 'error');

  try {
    const res  = await fetch('/api/auth/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, currentPassword, newPassword })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Password changed!', 'success');
      document.getElementById('changePasswordForm').reset();
    } else {
      showToast(data.error || 'Failed', 'error');
    }
  } catch {
    showToast('Network error', 'error');
  }
});

loadProfile();
loadOrders();
