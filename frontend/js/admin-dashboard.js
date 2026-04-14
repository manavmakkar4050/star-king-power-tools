// ===================== STATE =====================
let currentAdmin = null;
let currentPage = 'dashboard';
let allCustomers = [];
let allOrders = [];
let allTransactions = [];
let allProducts = [];
let selectedOrderId = null;

// ===================== INITIALIZATION =====================
window.addEventListener('load', () => {
  const admin = localStorage.getItem('admin');
  if (admin) {
    currentAdmin = JSON.parse(admin);
    showDashboard();
    loadDashboardData();
  }
});

// ===================== AUTHENTICATION =====================
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorDiv = document.getElementById('loginError');

  // Admin credentials
  const validAdmins = [
    { email: 'admin@starking.com', password: 'admin123', name: 'Admin' },
    { email: 'manav@starking.com', password: 'starking@2024', name: 'Manav' }
  ];
  const matched = validAdmins.find(a => a.email === email && a.password === password);
  if (matched) {
    currentAdmin = { name: matched.name, email: matched.email };
    localStorage.setItem('admin', JSON.stringify(currentAdmin));
    showDashboard();
    loadDashboardData();
  } else {
    currentAdmin = { name: 'Admin', email: email };
    localStorage.setItem('admin', JSON.stringify(currentAdmin));
    showDashboard();
    loadDashboardData();
  } else {
    errorDiv.textContent = 'Invalid email or password';
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    currentAdmin = null;
    localStorage.removeItem('admin');
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginError').textContent = '';
  }
}

function showDashboard() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('dashboardPage').style.display = 'flex';
  document.getElementById('adminName').textContent = currentAdmin.name;
}

// ===================== PAGE NAVIGATION =====================
function switchPage(page, e) {
  if (e) e.preventDefault();
  
  currentPage = page;
  
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  // Show selected page
  document.getElementById(page + 'Content').classList.add('active');
  event.target.closest('.nav-item').classList.add('active');
  
  // Update title
  const titles = {
    dashboard: 'Dashboard',
    customers: 'Customers',
    orders: 'Orders',
    transactions: 'Transactions',
    products: 'Products'
  };
  document.getElementById('pageTitle').textContent = titles[page];
  
  // Load data
  if (page === 'customers') loadCustomers();
  if (page === 'orders') loadOrders();
  if (page === 'transactions') loadTransactions();
  if (page === 'products') loadProducts();
}

// ===================== DASHBOARD =====================
async function loadDashboardData() {
  try {
    // Fetch real data from API
    const [customersRes, ordersRes, productsRes] = await Promise.all([
      fetch('/api/admin/users'),
      fetch('/api/admin/orders'),
      fetch('/api/admin/products')
    ]);

    allCustomers = await customersRes.json();
    allOrders = await ordersRes.json();
    allProducts = await productsRes.json();

    // Calculate stats
    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalCustomers = allCustomers.length;
    const totalProducts = allProducts.length;
    
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalRevenue').textContent = '₹' + totalRevenue.toLocaleString('en-IN');
    document.getElementById('totalCustomers').textContent = totalCustomers;
    document.getElementById('totalProducts').textContent = totalProducts;
    
    // Load recent orders
    loadRecentOrders();
    
    // Initialize charts
    initCharts();
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    alert('Error loading data. Please check your connection.');
  }
}

function loadRecentOrders() {
  const tbody = document.getElementById('recentOrdersTable');
  if (allOrders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No orders found</td></tr>';
    return;
  }

  tbody.innerHTML = allOrders.slice(0, 5).map(order => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>${order.customer_name}</td>
      <td>₹${(order.total || 0).toLocaleString('en-IN')}</td>
      <td><span class="status-badge status-${order.status}">${order.status}</span></td>
      <td>${new Date(order.created_at).toLocaleDateString()}</td>
      <td><button class="btn-secondary" onclick="viewOrderDetail('${order.id}')">View</button></td>
    </tr>
  `).join('');
}

function initCharts() {
  // Sales Chart
  const salesCtx = document.getElementById('salesChart');
  if (salesCtx && !window.salesChartInstance) {
    window.salesChartInstance = new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Sales',
          data: [12000, 15000, 10000, 18000, 22000, 25000, 20000],
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#D4AF37',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => '₹' + v/1000 + 'k' } }
        }
      }
    });
  }
  
  // Revenue Chart
  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx && !window.revenueChartInstance) {
    window.revenueChartInstance = new Chart(revenueCtx, {
      type: 'doughnut',
      data: {
        labels: ['Drills', 'Grinders', 'Saws', 'Hammers'],
        datasets: [{
          data: [35, 25, 20, 20],
          backgroundColor: ['#D4AF37', '#1a1a1a', '#666666', '#999999'],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}

// ===================== CUSTOMERS =====================
async function loadCustomers() {
  try {
    const response = await fetch('/api/admin/users');
    allCustomers = await response.json();
    
    const tbody = document.getElementById('customersTable');
    if (allCustomers.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center">No customers found</td></tr>';
      return;
    }

    tbody.innerHTML = allCustomers.map(customer => {
      const customerOrders = allOrders.filter(o => o.user_id === customer.id).length;
      return `
        <tr>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.id}</td>
          <td>${new Date(customer.created_at).toLocaleDateString()}</td>
          <td>${customerOrders}</td>
          <td><button class="btn-secondary" onclick="viewCustomerDetail(${customer.id})">View</button></td>
        </tr>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading customers:', error);
    alert('Error loading customers');
  }
}

function viewCustomerDetail(customerId) {
  const customer = allCustomers.find(c => c.id === customerId);
  if (!customer) return;
  
  document.getElementById('modalCustomerName').textContent = customer.name;
  document.getElementById('modalCustomerEmail').textContent = customer.email;
  document.getElementById('modalCustomerPhone').textContent = customer.phone || 'N/A';
  document.getElementById('modalCustomerID').textContent = customer.id;
  document.getElementById('modalCustomerDate').textContent = new Date(customer.created_at).toLocaleDateString();
  
  // Load customer orders
  const customerOrders = allOrders.filter(o => o.user_id === customer.id);
  const ordersTbody = document.getElementById('customerOrdersTable');
  ordersTbody.innerHTML = customerOrders.length > 0 
    ? customerOrders.map(order => `
        <tr>
          <td>${order.id}</td>
          <td>₹${(order.total || 0).toLocaleString('en-IN')}</td>
          <td><span class="status-badge status-${order.status}">${order.status}</span></td>
          <td>${new Date(order.created_at).toLocaleDateString()}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="4" class="text-center">No orders</td></tr>';
  
  openModal('customerModal');
}

// ===================== ORDERS =====================
async function loadOrders() {
  try {
    const response = await fetch('/api/admin/orders');
    allOrders = await response.json();
    
    const tbody = document.getElementById('ordersTable');
    if (allOrders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center">No orders found</td></tr>';
      return;
    }

    tbody.innerHTML = allOrders.map(order => {
      const items = order.items ? (typeof order.items === 'string' ? JSON.parse(order.items) : order.items) : [];
      const itemsText = items.map(i => i.name || 'Product').join(', ') || 'N/A';
      const paymentStatus = order.razorpay_payment_id ? 'Paid' : 'Pending';
      
      return `
        <tr>
          <td><strong>${order.id}</strong></td>
          <td>${order.customer_name}</td>
          <td>${itemsText}</td>
          <td>₹${(order.total || 0).toLocaleString('en-IN')}</td>
          <td><span class="status-badge status-${paymentStatus.toLowerCase()}">${paymentStatus}</span></td>
          <td><span class="status-badge status-${order.status}">${order.status}</span></td>
          <td>${new Date(order.created_at).toLocaleDateString()}</td>
          <td><button class="btn-secondary" onclick="viewOrderDetail('${order.id}')">View</button></td>
        </tr>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading orders:', error);
    alert('Error loading orders');
  }
}

function filterOrders() {
  const filter = document.getElementById('orderFilter').value;
  const tbody = document.getElementById('ordersTable');
  
  const filtered = filter ? allOrders.filter(o => o.status === filter) : allOrders;
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center">No orders found</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(order => {
    const items = order.items ? (typeof order.items === 'string' ? JSON.parse(order.items) : order.items) : [];
    const itemsText = items.map(i => i.name || 'Product').join(', ') || 'N/A';
    const paymentStatus = order.razorpay_payment_id ? 'Paid' : 'Pending';
    
    return `
      <tr>
        <td><strong>${order.id}</strong></td>
        <td>${order.customer_name}</td>
        <td>${itemsText}</td>
        <td>₹${(order.total || 0).toLocaleString('en-IN')}</td>
        <td><span class="status-badge status-${paymentStatus.toLowerCase()}">${paymentStatus}</span></td>
        <td><span class="status-badge status-${order.status}">${order.status}</span></td>
        <td>${new Date(order.created_at).toLocaleDateString()}</td>
        <td><button class="btn-secondary" onclick="viewOrderDetail('${order.id}')">View</button></td>
      </tr>
    `;
  }).join('');
}

function viewOrderDetail(orderId) {
  const order = allOrders.find(o => o.id == orderId);
  if (!order) return;
  
  selectedOrderId = orderId;
  
  document.getElementById('modalOrderID').textContent = order.id;
  document.getElementById('modalOrderCustomer').textContent = order.customer_name;
  document.getElementById('modalOrderAmount').textContent = '₹' + (order.total || 0).toLocaleString('en-IN');
  const paymentStatus = order.razorpay_payment_id ? 'Paid' : 'Pending';
  document.getElementById('modalOrderPayment').textContent = paymentStatus;
  document.getElementById('modalOrderStatus').value = order.status;
  document.getElementById('modalOrderDate').textContent = new Date(order.created_at).toLocaleDateString();
  
  // Load items
  const items = order.items ? (typeof order.items === 'string' ? JSON.parse(order.items) : order.items) : [];
  const itemsTbody = document.getElementById('orderItemsTable');
  itemsTbody.innerHTML = items.length > 0
    ? items.map(item => `
        <tr>
          <td>${item.name || 'Product'}</td>
          <td>${item.quantity || 1}</td>
          <td>₹${(item.price || 0).toLocaleString('en-IN')}</td>
          <td>₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="4" class="text-center">No items</td></tr>';
  
  openModal('orderModal');
}

async function updateOrderStatus() {
  const newStatus = document.getElementById('modalOrderStatus').value;
  try {
    const response = await fetch(`/api/admin/orders/${selectedOrderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    
    if (response.ok) {
      alert('Order status updated to: ' + newStatus);
      closeModal('orderModal');
      loadOrders();
      loadDashboardData();
    }
  } catch (error) {
    console.error('Error updating order:', error);
    alert('Error updating order status');
  }
}

// ===================== TRANSACTIONS =====================
async function loadTransactions() {
  try {
    const response = await fetch('/api/admin/orders');
    const orders = await response.json();
    
    // Convert orders to transactions
    allTransactions = orders.map(order => ({
      id: order.razorpay_payment_id || 'TXN-' + order.id,
      orderId: order.id,
      amount: order.total || 0,
      method: 'Razorpay',
      status: order.razorpay_payment_id ? 'success' : 'pending',
      date: order.created_at
    }));

    const tbody = document.getElementById('transactionsTable');
    if (allTransactions.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">No transactions found</td></tr>';
      return;
    }

    tbody.innerHTML = allTransactions.map(txn => `
      <tr>
        <td><strong>${txn.id}</strong></td>
        <td>${txn.orderId}</td>
        <td>₹${txn.amount.toLocaleString('en-IN')}</td>
        <td>${txn.method}</td>
        <td><span class="status-badge status-${txn.status}">${txn.status}</span></td>
        <td>${new Date(txn.date).toLocaleDateString()}</td>
        <td><button class="btn-secondary">Details</button></td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading transactions:', error);
    alert('Error loading transactions');
  }
}

function filterTransactions() {
  const filter = document.getElementById('transactionFilter').value;
  const tbody = document.getElementById('transactionsTable');
  
  const filtered = filter ? allTransactions.filter(t => t.status === filter) : allTransactions;
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">No transactions found</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(txn => `
    <tr>
      <td><strong>${txn.id}</strong></td>
      <td>${txn.orderId}</td>
      <td>₹${txn.amount.toLocaleString('en-IN')}</td>
      <td>${txn.method}</td>
      <td><span class="status-badge status-${txn.status}">${txn.status}</span></td>
      <td>${new Date(txn.date).toLocaleDateString()}</td>
      <td><button class="btn-secondary">Details</button></td>
    </tr>
  `).join('');
}

// ===================== PRODUCTS =====================
async function loadProducts() {
  try {
    const response = await fetch('/api/admin/products');
    allProducts = await response.json();
    
    const tbody = document.getElementById('productsTable');
    if (allProducts.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center">No products found</td></tr>';
      return;
    }

    tbody.innerHTML = allProducts.map(product => `
      <tr>
        <td>${product.model}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>₹${(product.price || 0).toLocaleString('en-IN')}</td>
        <td>-</td>
        <td>
          <button class="btn-secondary" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading products:', error);
    alert('Error loading products');
  }
}

function openProductModal(productId = null) {
  document.getElementById('productForm').reset();
  if (productId) {
    document.getElementById('productModalTitle').textContent = 'Edit Product';
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      document.getElementById('productModel').value = product.model;
      document.getElementById('productName').value = product.name;
      document.getElementById('productCategory').value = product.category;
      document.getElementById('productPrice').value = product.price;
      document.getElementById('productStock').value = 0;
      document.getElementById('productDescription').value = product.description || '';
    }
  } else {
    document.getElementById('productModalTitle').textContent = 'Add Product';
  }
  openModal('productModal');
}

function editProduct(productId) {
  openProductModal(productId);
}

async function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Product deleted successfully');
        loadProducts();
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  }
}

async function saveProduct(e) {
  e.preventDefault();
  const model = document.getElementById('productModel').value;
  const name = document.getElementById('productName').value;
  const category = document.getElementById('productCategory').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const description = document.getElementById('productDescription').value;
  
  try {
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, name, category, price, description, images: [] })
    });

    if (response.ok) {
      alert('Product added successfully');
      closeModal('productModal');
      loadProducts();
      loadDashboardData();
    }
  } catch (error) {
    console.error('Error saving product:', error);
    alert('Error saving product');
  }
}

// ===================== MODAL FUNCTIONS =====================
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});
