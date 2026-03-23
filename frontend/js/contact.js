document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all required fields', true);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', true);
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message })
    });
    const data = await res.json();
    if (data.success) {
      showToast('✅ Message sent! We\'ll get back to you soon.');
      document.getElementById('contactForm').reset();
    } else {
      showToast(data.error || 'Failed to send message', true);
    }
  } catch (err) {
    showToast('Network error. Please try again.', true);
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
});
