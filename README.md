# ⚡ Star King Power Tools — E-Commerce Website

A full-stack e-commerce website for Star King Power Tools, built with HTML/CSS/JS (frontend), Node.js + Express (backend), and SQLite (database).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open in Browser
```
http://localhost:3000
```

That's it! The database is created and seeded automatically on first run.

---

## 📁 Project Structure

```
star-king/
├── backend/
│   ├── server.js          ← Express server
│   ├── db.js              ← SQLite setup & seed data
│   ├── database.sqlite    ← Auto-created on first run
│   └── routes/
│       ├── products.js    ← GET /api/products
│       ├── cart.js        ← POST /api/cart/order
│       └── contact.js     ← POST /api/contact
├── frontend/
│   ├── index.html         ← Home page (animated hero, featured products)
│   ├── products.html      ← All products with category filters
│   ├── cart.html          ← Shopping cart with order placement
│   ├── about.html         ← About us, team, values
│   ├── contact.html       ← Contact form, info, map
│   ├── css/style.css      ← All styles (green/white industrial theme)
│   └── js/
│       ├── main.js        ← Navbar, scroll animations, cart badge
│       ├── products.js    ← Product loading & filtering
│       ├── cart.js        ← Cart management
│       └── contact.js     ← Contact form submission
└── package.json
```

---

## 🌐 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Animated hero, marquee, features, featured products |
| Products | `/products.html` | All 12 products with category filter |
| Cart | `/cart.html` | Cart, quantities, GST, order placement |
| About | `/about.html` | Story, team, stats, values |
| Contact | `/contact.html` | Form, info, Google Maps |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | All products |
| GET | `/api/products?featured=true` | Featured products only |
| GET | `/api/products?category=Drills` | By category |
| GET | `/api/products/:id` | Single product |
| POST | `/api/cart/order` | Place an order |
| POST | `/api/contact` | Submit contact form |

---

## 🎨 Tech Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express.js
- **Database**: SQLite via better-sqlite3 (zero config, file-based)
- **Fonts**: Bebas Neue + Nunito (Google Fonts)

---

## 🛒 Cart

Cart state is stored in `localStorage`. Items persist across page navigation. Cart count badge updates live on all pages.

---

## 📦 Products

12 sample products across 4 categories:
- **Drills** (3): Cordless Drill 18V, Hammer Drill Pro, Right Angle Drill
- **Grinders** (3): Angle Grinder 4.5", Bench Grinder 8", Die Grinder Mini
- **Saws** (3): Circular Saw 7.25", Jigsaw Variable Speed, Reciprocating Saw
- **Hammers** (3): Rotary Hammer 28mm, Demolition Hammer, SDS Hammer Drill

---

## Development

```bash
npm run dev   # Start with nodemon (auto-restart on file changes)
```

Install nodemon if needed:
```bash
npm install -g nodemon
```
