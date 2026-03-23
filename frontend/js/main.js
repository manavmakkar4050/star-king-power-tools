// ===================== NAVBAR =====================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)', spans[1].style.opacity = '0', spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
      : (spans[0].style.transform = '', spans[1].style.opacity = '', spans[2].style.transform = '');
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});

// ===================== AUTH ZONE =====================
function updateAuthZone() {
  const authZone = document.querySelector('.nav-auth-zone');
  if (!authZone) return;
  
  const currentUser = localStorage.getItem('starking_currentUser');
  
  if (!currentUser) {
    // Not logged in
    authZone.innerHTML = '<a href="login.html" class="btn-secondary" style="padding: 8px 16px; font-size: 14px;">Login</a>';
  } else {
    // Logged in
    const user = JSON.parse(currentUser);
    const firstName = user.name.split(' ')[0];
    const initial = firstName.charAt(0).toUpperCase();
    
    authZone.innerHTML = `
      <div class="user-menu">
        <button class="user-avatar">${initial}</button>
        <span class="user-name">${firstName}</span>
        <div class="user-dropdown">
          <a href="profile.html">👤 My Profile</a>
          <a href="profile.html">📦 My Orders</a>
          <a href="#" id="logoutBtn">🚪 Logout</a>
        </div>
      </div>
    `;
    
    // Dropdown toggle
    const userAvatar = authZone.querySelector('.user-avatar');
    const dropdown = authZone.querySelector('.user-dropdown');
    
    userAvatar.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });
    
    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!authZone.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('starking_currentUser');
      showToast('Logged out successfully!');
      setTimeout(() => window.location.href = 'index.html', 1000);
    });
  }
}

updateAuthZone();

// ===================== SCROLL REVEAL =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Also for feature/product cards
document.querySelectorAll('.feature-card, .product-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// ===================== CART BADGE =====================
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('starking_cart') || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

updateCartBadge();

// ===================== TOAST =====================
function showToast(message, isError = false) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${isError ? 'error' : ''}`;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3500);
}

window.showToast = showToast;
window.updateCartBadge = updateCartBadge;

// ===================== ADD TO CART =====================
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('starking_cart') || '[]');
  const existing = cart.find(i => i.id === product.id);
  
  // Convert images array to image_url for cart compatibility
  const cartItem = { ...product, qty: 1 };
  if (product.images && product.images.length > 0) {
    // Convert ../images/ to /images/ for absolute path from root
    let imagePath = product.images[0];
    imagePath = imagePath.replace('../images/', '/images/');
    cartItem.image_url = imagePath;
  } else if (product.image_url) {
    // If image_url doesn't have /, add it
    let imagePath = product.image_url;
    if (!imagePath.startsWith('/')) {
      imagePath = '/' + imagePath;
    }
    cartItem.image_url = imagePath;
  }
  
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(cartItem);
  }
  localStorage.setItem('starking_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`✅ ${product.name} added to cart!`);
}

window.addToCart = addToCart;
