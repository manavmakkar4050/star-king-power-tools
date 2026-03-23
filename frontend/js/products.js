// ── All Products ─────────────────────────────────────────────────────────────
const allProducts = [
  { id: 1,  model: 'SK-515', name: 'Impact Drill',       category: 'Drills',   price: 3299, description: 'Powerful impact drill for heavy-duty drilling and fastening',         images: ['../images/impact_drill_1.png',       '../images/impact_drill_2.png'] },
  { id: 2,  model: 'SK-517', name: 'Electric Screwdriver',category: 'Drills',  price: 1699, description: 'Compact electric screwdriver for precision work',                    images: ['../images/electric_screwdriver_1.png','../images/electric_screwdriver_2.png'] },
  { id: 3,  model: 'SK-502', name: 'Angle Grinder',      category: 'Grinders', price: 1499, description: 'Versatile angle grinder for cutting and grinding',                   images: ['../images/angle_grinder_1.png',       '../images/angle_grinder_2.png'] },
  { id: 4,  model: 'SK-531', name: 'Marble Cutter',      category: 'Grinders', price: 6999, description: 'Precision marble and tile cutting machine',                          images: ['../images/marble_cutter_1.png',       '../images/marble_cutter_2.png'] },
  { id: 5,  model: 'SK-533', name: 'Circular Saw',       category: 'Saws',     price: 3899, description: 'High-speed circular saw for clean cuts',                             images: ['../images/circular_saw_1.png',        '../images/circular_saw_2.png'] },
  { id: 6,  model: 'SK-535', name: 'Jig Saw',            category: 'Saws',     price: 2299, description: 'Precision jig saw for intricate cutting',                            images: ['../images/jig_saw_1.png',             '../images/jig_saw_2.png'] },
  { id: 7,  model: 'SK-538', name: 'Cut Off Machine',    category: 'Saws',     price: 9999, description: 'Industrial cut-off machine for metal and masonry',                   images: ['../images/cut_off_machine_1.png',     '../images/cut_off_machine_2.png'] },
  { id: 8,  model: 'SK-542', name: 'Demolition Hammer',  category: 'Hammers',  price: 5999, description: 'Heavy-duty demolition hammer for tough jobs',                        images: ['../images/demolition_hammer_1.png',   '../images/demolition_hammer_2.png'] },
  { id: 9,  model: 'SK-522', name: 'Rotary Hammer',      category: 'Hammers',  price: 5599, description: 'Powerful rotary hammer for concrete and masonry',                    images: ['../images/rotary_hammer_1.png',       '../images/rotary_hammer_2.png'] },
  { id: 10, model: 'SK-537', name: 'Electric Mixer',     category: 'Drills',   price: 4499, description: 'Heavy-duty electric mixer for concrete and mortar',                  images: ['../images/electric_mixer_1.png',      '../images/electric_mixer_2.png'] },
  { id: 11, model: 'SK-527', name: 'Electric Blower',    category: 'Drills',   price: 1999, description: 'Powerful electric blower for cleaning and air circulation',          images: ['../images/electric_blower_1.png',     '../images/electric_blower_2.png'] },
  { id: 12, model: 'SK-525', name: 'Electric Planner',   category: 'Saws',     price: 2799, description: 'Precision electric planner for woodworking',                         images: ['../images/electric_planner_1.png',    '../images/electric_planner_2.png'] },
];

// ── Product Details ───────────────────────────────────────────────────────────
const productDetails = {
  1: {
    category: 'ACCESSORIES',
    overview: 'The Star King SK-515 Impact Drill is a high-performance drilling tool built for demanding construction and industrial tasks. With its powerful motor and impact mechanism, it delivers superior drilling efficiency on hard surfaces like concrete, brick, and masonry.',
    features: ['Heavy-duty motor for tough drilling jobs','Impact function for concrete and masonry','Ergonomic side handle for better control','Durable build for long working hours','Stable performance with reduced vibration'],
    specs: [['Model','SK-515'],['Power Input','900W'],['Speed','0–2800 RPM'],['Chuck Size','13 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Drilling in concrete and brick walls','Masonry and construction work','Metal and wood drilling (impact off)','Industrial and site use'],
    inbox: ['Impact Drill (SK-515)','Side Handle','Depth Rod','User Manual'],
    safety: ['Use safety goggles during operation','Do not apply excessive pressure','Allow the tool to cool during long use','Clean and lubricate the chuck periodically']
  },
  2: {
    category: 'BLACK SERIES',
    overview: 'The Star King SK-517 Electric Screwdriver is a compact and efficient power tool designed for fast, accurate screw-driving and light drilling tasks. Ideal for household use, furniture assembly, electrical fittings, and small workshop jobs.',
    features: ['Lightweight and easy to operate','Smooth speed control for precision work','Durable motor for long service life','Compact body for tight spaces','Suitable for both professionals and DIY users'],
    specs: [['Model','SK-517'],['Power Input','450W'],['Speed','0–750 RPM'],['Chuck Size','10 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Furniture assembly','Screw fastening','Light drilling in wood and plastic','Electrical and interior fitting work'],
    inbox: ['Electric Screwdriver (SK-517)','User Manual','Warranty Card'],
    safety: ['Always use appropriate safety gloves','Avoid continuous overloading','Clean vents regularly to prevent overheating','Store in a dry place after use']
  },
  3: {
    category: 'KING SERIES',
    overview: 'The Star King SK-502 Angle Grinder is a compact yet powerful cutting and grinding tool designed for professional and industrial use. It delivers high-speed performance with excellent control, making it suitable for metal fabrication, construction work, and workshop applications.',
    features: ['Powerful motor for heavy-duty grinding and cutting','Compact design for easy handling and control','High-speed performance for clean and efficient results','Strong build quality for long service life','Suitable for professional and workshop use'],
    specs: [['Model','SK-502'],['Power Input','950W'],['No-Load Speed','11,000 RPM'],['Disc Size','100 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Metal cutting and grinding','Surface polishing and finishing','Rust removal','Construction and fabrication work'],
    inbox: ['Angle Grinder (SK-502)','Grinding Wheel','Side Handle','Spanner','User Manual'],
    safety: ['Always wear safety goggles and gloves','Ensure disc is properly fitted before use','Do not overload the machine','Clean air vents regularly to avoid overheating']
  },
  4: {
    category: 'ACCESSORIES',
    overview: 'The Star King SK-531 Marble Cutter is a high-speed cutting tool designed for precise cutting of marble, tiles, granite, and stone. Built with a powerful motor and sturdy body, it ensures clean cuts and long-lasting performance.',
    features: ['High-speed motor for smooth and accurate cutting','Compact and sturdy design','Strong base plate for stability','Ergonomic handle for better control','Suitable for professional tile and stone work'],
    specs: [['Model','SK-531'],['Power Input','1400W'],['Speed','11,000 RPM'],['Blade Size','110 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Marble and tile cutting','Granite and stone cutting','Flooring and interior work','Construction site usage'],
    inbox: ['Marble Cutter (SK-531)','Cutting Blade','Wrench','User Manual'],
    safety: ['Always wear protective gloves and goggles','Ensure blade guard is in place','Avoid wet conditions unless tool supports wet cutting','Clean dust after each use']
  },
  5: {
    category: 'KING SERIES',
    overview: 'The Star King SK-533 Circular Saw is a powerful cutting tool designed for accurate and efficient wood cutting. It delivers high-speed performance with clean and straight cuts, making it ideal for carpentry, furniture making, and construction work.',
    features: ['High-speed motor for smooth cutting','Strong and stable base plate for accuracy','Ergonomic handle for comfortable grip','Durable blade guard for added safety','Suitable for professional and workshop use'],
    specs: [['Model','SK-533'],['Power Input','1100W'],['Speed','13,000 RPM'],['Blade Size','185 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Wood cutting and carpentry work','Furniture manufacturing','Plywood and MDF cutting','Construction site usage'],
    inbox: ['Circular Saw (SK-533)','Cutting Blade','Allen Key','User Manual'],
    safety: ['Always wear safety gloves and goggles','Ensure blade is properly tightened','Keep hands away from cutting area','Clean sawdust after every use']
  },
  6: {
    category: 'KING SERIES',
    overview: 'The Star King SK-535 Jig Saw is a versatile and precise cutting tool designed for curved and straight cutting applications. Ideal for woodworking, furniture making, and interior finishing tasks.',
    features: ['Variable speed control for precise cutting','Powerful motor for smooth and clean cuts','Compact and ergonomic design for easy handling','Stable base plate for improved accuracy','Suitable for professional and workshop use'],
    specs: [['Model','SK-535'],['Power Input','700W'],['Speed','0–3000 RPM'],['Cutting Depth','70 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Curved and straight cutting in wood','Plastic and thin metal cutting','Furniture and interior work','Carpentry and workshop use'],
    inbox: ['Jig Saw (SK-535)','Cutting Blade','Hex Key','User Manual'],
    safety: ['Secure the workpiece before cutting','Keep fingers away from the blade','Replace dull blades for best performance','Clean sawdust after use and store in a dry place']
  },
  7: {
    category: 'KING SERIES',
    overview: 'The Star King SK-538 Cut-Off Machine is a heavy-duty power tool designed for fast and precise cutting of metal pipes, rods, and bars. Equipped with a high-power motor and stable base, it delivers clean cuts with excellent control.',
    features: ['High-power motor for tough metal cutting','Strong and stable base for accurate operation','Protective blade guard for user safety','Ergonomic handle for controlled cutting','Suitable for industrial and fabrication work'],
    specs: [['Model','SK-538'],['Power Input','2500W'],['Speed','3900 RPM'],['Blade Size','355 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Cutting metal rods and pipes','Fabrication and welding workshops','Construction site metal work','Industrial cutting operations'],
    inbox: ['Cut-Off Machine (SK-538)','Cutting Wheel','Spanner','User Manual'],
    safety: ['Wear face shield and gloves','Secure workpiece before cutting','Replace worn cutting wheels','Keep machine clean after use']
  },
  8: {
    category: 'BLACK SERIES',
    overview: 'The Star King SK-542 Demolition Hammer is a heavy-duty power tool built for breaking and chiseling tough materials. Designed for construction and renovation work, it delivers powerful impact energy to efficiently demolish concrete, tiles, and masonry surfaces.',
    features: ['High-impact force for fast demolition','Heavy-duty motor for continuous operation','Shock-absorbing handle for user comfort','Rugged housing for long-lasting durability','Ideal for professional construction sites'],
    specs: [['Model','SK-542'],['Power Input','1400W'],['Impact Rate','2900 BPM'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Concrete breaking','Tile and flooring removal','Wall demolition','Renovation and construction work'],
    inbox: ['Demolition Hammer (SK-542)','Point Chisel','Flat Chisel','Carry Case','User Manual'],
    safety: ['Always wear protective gear','Avoid prolonged continuous operation','Check chisels for wear regularly','Store in a dry and dust-free place']
  },
  9: {
    category: 'KING SERIES',
    overview: 'The Star King SK-522 Rotary Hammer is a powerful and reliable tool designed for heavy-duty drilling and hammer drilling applications. Built for construction and renovation work, it delivers strong impact energy and high drilling efficiency on hard surfaces.',
    features: ['High-power motor for heavy-duty performance','Hammer drilling function for concrete and masonry','Ergonomic handle for better control and reduced fatigue','Durable construction for long service life','Suitable for professional construction and industrial use'],
    specs: [['Model','SK-522'],['Power Input','1200W'],['Speed','500–3100 RPM'],['Drilling Capacity','20 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Drilling in concrete and brick','Hammer drilling for masonry work','Construction and renovation projects','Professional site usage'],
    inbox: ['Rotary Hammer (SK-522)','Side Handle','Depth Gauge','User Manual'],
    safety: ['Always wear safety goggles and gloves','Ensure drill bits are securely fixed','Do not overload the machine','Clean air vents regularly and store in a dry place']
  },
  10: {
    category: 'KING SERIES',
    overview: 'The Star King SK-537 Electric Mixer is a powerful and reliable tool designed for mixing construction materials such as cement, paint, adhesive, and plaster. Built for heavy-duty applications, it ensures consistent mixing results while reducing manual effort.',
    features: ['High-torque motor for thick material mixing','Durable mixing rod for uniform blending','Ergonomic dual-handle design for better control','Stable performance with reduced vibration','Suitable for continuous site usage'],
    specs: [['Model','SK-537'],['Power Input','1100W'],['Speed','550 RPM'],['Mixing Rod Diameter','150 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Cement and mortar mixing','Paint and coating preparation','Adhesive and plaster mixing','Construction and renovation sites'],
    inbox: ['Electric Mixer (SK-537)','Mixing Rod','User Manual'],
    safety: ['Secure mixing rod before operation','Avoid splashing by starting at low speed','Clean rod immediately after use','Store in a dry place']
  },
  11: {
    category: 'BLACK SERIES',
    overview: 'The Star King SK-527 Electric Blower is a compact and high-speed cleaning tool designed to remove dust, debris, and light waste from work areas. Ideal for workshops, construction sites, and home garages.',
    features: ['Powerful air output for effective cleaning','Lightweight and easy to handle','Ergonomic grip for comfortable operation','Durable motor for long service life','Suitable for workshop and home use'],
    specs: [['Model','SK-527'],['Power Input','650W'],['Speed','16,000 RPM'],['Air Volume','2.3 m³/min'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Dust and debris removal','Cleaning machines and tools','Workshop and garage cleaning','Electronic equipment cleaning'],
    inbox: ['Electric Blower (SK-527)','Blower Nozzle','User Manual'],
    safety: ['Do not direct air at people or animals','Use safety goggles during operation','Keep air vents clean','Store in a dry environment']
  },
  12: {
    category: 'BLACK SERIES',
    overview: 'The Star King SK-525 Electric Planer is a precision woodworking tool designed for smooth and accurate surface finishing. Ideal for leveling, trimming, and smoothing wooden surfaces with a high-speed motor and sharp planer blades.',
    features: ['High-speed motor for smooth surface finish','Adjustable depth control for precision work','Compact and ergonomic design','Durable blades for consistent performance','Suitable for professional carpentry tasks'],
    specs: [['Model','SK-525'],['Power Input','650W'],['Speed','16,000 RPM'],['Planing Width','82 mm'],['Voltage','220–240V'],['Frequency','50–60 Hz']],
    applications: ['Wood surface smoothing','Door and frame trimming','Furniture finishing','Carpentry and workshop use'],
    inbox: ['Electric Planer (SK-525)','Planer Blades (Installed)','Blade Adjustment Tool','User Manual'],
    safety: ['Keep hands clear of blades','Adjust depth before operation','Clean wood dust after use','Store in a dry place']
  }
};

// ── Render ────────────────────────────────────────────────────────────────────
let activeCategory = 'All';

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!products.length) { grid.innerHTML = '<div class="loading">No products found.</div>'; return; }

  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" style="transition-delay:${i * 0.08}s">
      <div class="product-img-wrap">
        <img class="product-img product-img-default" src="${p.images[0]}" alt="${p.name}" loading="lazy" />
        <img class="product-img product-img-hover" src="${p.images[1]}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name} <small class="product-model">(${p.model})</small></h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
          <div class="product-actions">
            <button class="btn-view-details" onclick="location.href='product_detail.html?id=${p.id}'">View Details</button>
            <button class="btn-add-cart" onclick='addToCart(${JSON.stringify(p)})'>🛒 Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.05 });
  document.querySelectorAll('.product-card').forEach(c => observer.observe(c));
}


function filterProducts(category) {
  activeCategory = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.cat === category));
  renderProducts(category === 'All' ? allProducts : allProducts.filter(p => p.category === category));
}

document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => filterProducts(btn.dataset.cat)));

renderProducts(allProducts);
