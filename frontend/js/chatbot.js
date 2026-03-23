// ===================== STAR KING AI CHATBOT =====================

const PRODUCT_DB = {
  impact_drill:       { id:1,  name:"Impact Drill",        price:"₹4,500",  specs:"800W motor, 0-3000 RPM, 13mm chuck, 2.8kg, Variable speed", uses:"Drilling in wood, metal, masonry; screw driving" },
  electric_screwdriver:{ id:2, name:"Electric Screwdriver", price:"₹1,200", specs:"3.6V Li-ion, 200 RPM, ±4Nm torque, 0.7kg, LED light", uses:"Light assembly, furniture, electronics" },
  angle_grinder:      { id:3,  name:"Angle Grinder",        price:"₹3,200",  specs:"850W, 11,000 RPM, 100mm disc, 1.8kg, Anti-restart", uses:"Cutting metal, grinding, polishing" },
  marble_cutter:      { id:4,  name:"Marble Cutter",        price:"₹8,500",  specs:"1300W, 3400 RPM, 110mm blade, 3.2kg, Dust guard", uses:"Marble, granite, tile, ceramic cutting" },
  circular_saw:       { id:5,  name:"Circular Saw",         price:"₹3,800",  specs:"1200W, 5500 RPM, 185mm blade, 3.5kg, Laser guide", uses:"Wood planks, plywood, framing lumber" },
  jig_saw:            { id:6,  name:"Jig Saw",              price:"₹2,800",  specs:"650W, 0-3000 SPM, T-shank blade, 2.1kg, 45° bevel", uses:"Curves, shapes, intricate wood/metal cuts" },
  cut_off_machine:    { id:7,  name:"Cut Off Machine",      price:"₹6,200",  specs:"2000W, 3800 RPM, 355mm disc, 8.5kg, Spark guard", uses:"Steel pipes, rebar, metal profiles" },
  demolition_hammer:  { id:8,  name:"Demolition Hammer",    price:"₹7,500",  specs:"1500W, 1800 BPM, 30mm chisel, 8.2kg, SDS-max", uses:"Breaking concrete, chiseling, demolition" },
  rotary_hammer:      { id:9,  name:"Rotary Hammer",        price:"₹6,800",  specs:"1100W, 4.5J impact, 0-900 RPM, 5.1kg, SDS-plus, 3-mode", uses:"Concrete drilling, masonry, anchors" },
  electric_mixer:     { id:10, name:"Electric Mixer",       price:"₹5,200",  specs:"1600W, 0-800 RPM, 140L capacity paddle, 7.8kg", uses:"Concrete, mortar, plaster, paint mixing" },
  electric_blower:    { id:11, name:"Electric Blower",      price:"₹2,100",  specs:"600W, 16,000 RPM, 200 km/h airspeed, 1.5kg", uses:"Cleaning dust, drying, air circulation" },
  electric_planner:   { id:12, name:"Electric Planner",     price:"₹4,200",  specs:"580W, 16,000 RPM, 82mm width, 2.1kg, 0-3mm depth", uses:"Smoothing wood, door fitting, surface prep" },
};

const KNOWLEDGE_BASE = [
  {
    keywords: ['all product', 'product list', 'what sell', 'show product', 'catalogue', 'catalog'],
    answer: `We carry <strong>12 professional power tools</strong>:<br><br>
🔩 <strong>Drills & Drivers:</strong> Impact Drill (₹4,500), Electric Screwdriver (₹1,200), Electric Mixer (₹5,200), Electric Blower (₹2,100)<br>
⚙️ <strong>Grinders:</strong> Angle Grinder (₹3,200), Marble Cutter (₹8,500)<br>
🪚 <strong>Saws:</strong> Circular Saw (₹3,800), Jig Saw (₹2,800), Cut Off Machine (₹6,200), Electric Planner (₹4,200)<br>
🔨 <strong>Hammers:</strong> Demolition Hammer (₹7,500), Rotary Hammer (₹6,800)<br><br>
<a href="products.html" style="color:#2ecc40">View Full Catalogue →</a>`
  },
  {
    keywords: ['drill', 'drilling', 'impact drill'],
    answer: `Our best-selling <strong>Impact Drill (ID-101)</strong>:<br>
💪 800W motor | 0–3000 RPM | 13mm chuck<br>
⚡ Variable speed + reverse<br>
💰 Price: <strong>₹4,500</strong> (incl. 18% GST)<br><br>
Also available: Electric Screwdriver (₹1,200) for lighter work.<br>
<a href="product_detail.html?id=1" style="color:#2ecc40">View Impact Drill →</a>`
  },
  {
    keywords: ['grinder', 'angle grinder', 'grinding'],
    answer: `<strong>Angle Grinder (AG-850):</strong><br>
⚡ 850W | 11,000 RPM | 100mm disc<br>
🛡️ Anti-restart safety | Vibration control<br>
💰 Price: <strong>₹3,200</strong><br><br>
For tile/marble cutting, check our <a href="product_detail.html?id=4" style="color:#2ecc40">Marble Cutter (₹8,500) →</a>`
  },
  {
    keywords: ['saw', 'circular saw', 'cutting wood', 'wood cut'],
    answer: `<strong>Circular Saw (CS-1200):</strong><br>
🪚 1200W | 5500 RPM | 185mm blade<br>
🎯 Built-in laser guide | 45° bevel<br>
💰 Price: <strong>₹3,800</strong><br><br>
For intricate curves: <a href="product_detail.html?id=6" style="color:#2ecc40">Jig Saw (₹2,800) →</a>`
  },
  {
    keywords: ['hammer', 'rotary', 'concrete', 'masonry', 'drilling concrete'],
    answer: `For concrete work, we recommend our <strong>Rotary Hammer (RH-1100)</strong>:<br>
💥 1100W | 4.5 Joules impact energy<br>
🔄 3 modes: drill / hammer drill / chisel<br>
⚙️ SDS-plus chuck system<br>
💰 Price: <strong>₹6,800</strong><br><br>
For heavy demolition: <a href="product_detail.html?id=8" style="color:#2ecc40">Demolition Hammer (₹7,500) →</a>`
  },
  {
    keywords: ['demolition', 'break concrete', 'chisel', 'breaking'],
    answer: `<strong>Demolition Hammer (DH-1500):</strong><br>
💪 1500W | 1800 BPM | SDS-max<br>
🔨 30mm chisel included<br>
🏗️ Ideal for concrete breaking, tile removal<br>
💰 Price: <strong>₹7,500</strong><br>
<a href="product_detail.html?id=8" style="color:#2ecc40">View Details →</a>`
  },
  {
    keywords: ['marble', 'tile', 'ceramic', 'stone'],
    answer: `<strong>Marble Cutter (MC-1300):</strong><br>
💎 1300W | 3400 RPM | 110mm blade<br>
🛡️ Dust guard | Water cooling compatible<br>
🏆 Cuts marble, granite, ceramic, porcelain<br>
💰 Price: <strong>₹8,500</strong><br>
<a href="product_detail.html?id=4" style="color:#2ecc40">View Details →</a>`
  },
  {
    keywords: ['mixer', 'concrete mix', 'mortar', 'plaster'],
    answer: `<strong>Electric Mixer (EM-1600):</strong><br>
⚙️ 1600W | 0–800 RPM variable<br>
🔩 140L paddle | Ergonomic D-handle<br>
💰 Price: <strong>₹5,200</strong><br>
<a href="product_detail.html?id=10" style="color:#2ecc40">View Details →</a>`
  },
  {
    keywords: ['blower', 'cleaning', 'dust', 'air'],
    answer: `<strong>Electric Blower (EB-600):</strong><br>
💨 600W | 200 km/h airspeed<br>
⚡ 16,000 RPM | Ultra-lightweight 1.5kg<br>
💰 Price: <strong>₹2,100</strong> — our most affordable tool!<br>
<a href="product_detail.html?id=11" style="color:#2ecc40">View Details →</a>`
  },
  {
    keywords: ['warranty', 'guarantee', 'repair', 'service', 'after sale'],
    answer: `<strong>Star King Warranty Policy:</strong><br><br>
✅ <strong>2-Year full manufacturer warranty</strong> on all tools<br>
🔧 Free repairs within warranty period<br>
📍 Service centers across 30+ cities in India<br>
📞 Toll-free: <strong>1800 102 0375</strong><br>
✉️ customercare@starkingpowertools.com<br><br>
Warranty covers: manufacturing defects, motor failure, gear damage.<br>
<em>Not covered: physical damage, misuse, normal wear.</em>`
  },
  {
    keywords: ['price', 'cost', 'how much', 'cheapest', 'expensive'],
    answer: `<strong>Price Range at Star King:</strong><br><br>
🟢 Budget (under ₹3,000): Electric Screwdriver ₹1,200, Electric Blower ₹2,100, Jig Saw ₹2,800<br>
🟡 Mid-range (₹3,000–₹6,000): Angle Grinder ₹3,200, Circular Saw ₹3,800, Impact Drill ₹4,500, Electric Planner ₹4,200, Electric Mixer ₹5,200<br>
🔴 Pro (₹6,000+): Cut Off Machine ₹6,200, Rotary Hammer ₹6,800, Demolition Hammer ₹7,500, Marble Cutter ₹8,500<br><br>
All prices include 18% GST. EMI available on orders above ₹3,000.`
  },
  {
    keywords: ['shipping', 'delivery', 'dispatch', 'courier'],
    answer: `<strong>Delivery Info:</strong><br><br>
🚚 Free delivery on orders above ₹2,000<br>
📦 Standard delivery: 3–5 working days (metro cities)<br>
🌍 Pan-India delivery available<br>
⚡ Express delivery available for ₹149 extra<br>
📍 Order tracking via SMS & email`
  },
  {
    keywords: ['return', 'refund', 'exchange'],
    answer: `<strong>Return & Refund Policy:</strong><br><br>
🔄 7-day easy return on sealed/unused products<br>
🔧 Defective product? Replace within 30 days<br>
💳 Refund in 5–7 working days to original payment method<br>
📞 Contact us: 1800 102 0375`
  },
  {
    keywords: ['payment', 'pay', 'upi', 'card', 'cod', 'online payment'],
    answer: `<strong>Payment Options:</strong><br><br>
💳 Credit/Debit Cards (Visa, Mastercard, RuPay)<br>
📱 UPI (GPay, PhonePe, Paytm, BHIM)<br>
🏦 Net Banking<br>
💵 Cash on Delivery (COD)<br>
📊 EMI available on orders above ₹3,000`
  },
  {
    keywords: ['contact', 'address', 'location', 'where', 'phone', 'number'],
    answer: `<strong>Star King Contact:</strong><br><br>
📍 Gill Chownk, Gill Road, Miller Ganj, Ludhiana, Punjab 141003<br>
📞 Toll-free: <strong>1800 102 0375</strong><br>
✉️ customercare@starkingpowertools.com<br>
🕐 Mon–Sat: 9am–6pm IST`
  },
  {
    keywords: ['about', 'company', 'history', 'founded', 'who'],
    answer: `<strong>About Star King:</strong><br><br>
🏭 Founded in <strong>2010</strong> in Ludhiana, Punjab<br>
🇮🇳 100% Made in India<br>
📈 50,000+ tools sold annually<br>
🏙️ 30+ cities served across India<br>
💼 Trusted by electricians, plumbers, carpenters, contractors<br><br>
<a href="about.html" style="color:#2ecc40">Read Our Full Story →</a>`
  },
  {
    keywords: ['best tool', 'recommend', 'suggest', 'which tool', 'beginner', 'starter'],
    answer: `<strong>Tool Recommendations:</strong><br><br>
🔰 <strong>Beginner/DIY:</strong> Impact Drill (₹4,500) — most versatile<br>
🏗️ <strong>Construction:</strong> Rotary Hammer (₹6,800) + Circular Saw (₹3,800)<br>
🪟 <strong>Tile/Marble:</strong> Marble Cutter (₹8,500)<br>
🔨 <strong>Demo/Renovation:</strong> Demolition Hammer (₹7,500)<br>
🪵 <strong>Carpentry:</strong> Circular Saw + Electric Planner combo`
  },
];

// ===================== CHAT LOGIC =====================
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chatWindow');
  win.classList.toggle('open', chatOpen);
  if (chatOpen) {
    setTimeout(() => document.getElementById('chatInput').focus(), 300);
  }
}

function sendQuick(text) {
  document.getElementById('quickReplies').remove();
  processMessage(text);
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  processMessage(text);
}

function processMessage(text) {
  addMessage(text, 'user');
  showTyping();
  setTimeout(() => {
    removeTyping();
    const answer = getBotAnswer(text);
    addMessage(answer, 'bot', true);
  }, 800 + Math.random() * 600);
}

function getBotAnswer(text) {
  const lower = text.toLowerCase();

  // Check knowledge base
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some(k => lower.includes(k))) {
      return entry.answer;
    }
  }

  // Check individual product name
  for (const [key, prod] of Object.entries(PRODUCT_DB)) {
    if (lower.includes(prod.name.toLowerCase()) || lower.includes(key.replace(/_/g, ' '))) {
      return `<strong>${prod.name}:</strong><br>📋 ${prod.specs}<br>🎯 Best for: ${prod.uses}<br>💰 Price: <strong>${prod.price}</strong><br><a href="product_detail.html?id=${prod.id}" style="color:#2ecc40">View Product →</a>`;
    }
  }

  // Greetings
  if (/^(hi|hello|hey|namaste|good|hii)/i.test(lower)) {
    return "Hello! 👋 Welcome to Star King Power Tools! How can I help you today? Ask me about any of our 12 professional power tools, pricing, warranty, or delivery.";
  }

  if (/thank|thanks|ok|okay|great|nice/i.test(lower)) {
    return "You're welcome! 😊 Is there anything else I can help you with? Feel free to <a href='products.html' style='color:#2ecc40'>browse all products</a> or <a href='contact.html' style='color:#2ecc40'>contact our team</a> for expert advice.";
  }

  return "I'm not sure about that specific query. I can help you with:<br><br>• 🔧 Product specifications & pricing<br>• 🛡️ Warranty & after-sales service<br>• 🚚 Delivery & shipping info<br>• 💳 Payment options<br>• 📍 Contact & location<br><br>Try asking about a specific tool or topic!";
}

function addMessage(html, type, isHTML = false) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  if (isHTML) bubble.innerHTML = html;
  else bubble.textContent = html;
  div.appendChild(bubble);
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot chat-typing';
  div.id = 'typingIndicator';
  div.innerHTML = '<div class="chat-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}
