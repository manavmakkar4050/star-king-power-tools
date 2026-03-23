// Auth System - Login & Register (API-backed)

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Tab switching
document.querySelectorAll('.auth-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.tab;
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.auth-tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// LOGIN
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    const res  = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('starking_currentUser', JSON.stringify(data.user));
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(() => window.location.href = 'index.html', 1500);
    } else {
      showToast(data.error || 'Login failed', 'error');
    }
  } catch {
    showToast('Network error. Please try again.', 'error');
  }
});

// REGISTER
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name     = document.getElementById('registerName').value.trim();
  const email    = document.getElementById('registerEmail').value.trim();
  const phone    = document.getElementById('registerPhone').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirm  = document.getElementById('registerConfirm').value;

  if (!name || !email || !phone || !password || !confirm) {
    return showToast('All fields are required', 'error');
  }
  if (password.length < 6) return showToast('Password must be at least 6 characters', 'error');
  if (password !== confirm) return showToast('Passwords do not match', 'error');

  try {
    const res  = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('starking_currentUser', JSON.stringify(data.user));
      showToast('Registration successful! Redirecting...', 'success');
      setTimeout(() => window.location.href = 'index.html', 1500);
    } else {
      showToast(data.error || 'Registration failed', 'error');
    }
  } catch {
    showToast('Network error. Please try again.', 'error');
  }
});

// FORGOT PASSWORD
document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
  e.preventDefault();
  showToast('Reset link sent to your email!', 'info');
});
