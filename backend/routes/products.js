const express = require('express');
const router = express.Router();

const products = [
  { id: 1,  model: 'SK-515', name: 'Impact Drill',        category: 'Drills',   price: 3299, description: 'Powerful impact drill for heavy-duty drilling and fastening',        images: ['/images/impact_drill_1.png',        '/images/impact_drill_2.png'] },
  { id: 2,  model: 'SK-517', name: 'Electric Screwdriver',category: 'Drills',   price: 1699, description: 'Compact electric screwdriver for precision work',                   images: ['/images/electric_screwdriver_1.png', '/images/electric_screwdriver_2.png'] },
  { id: 3,  model: 'SK-502', name: 'Angle Grinder',       category: 'Grinders', price: 1499, description: 'Versatile angle grinder for cutting and grinding',                  images: ['/images/angle_grinder_1.png',        '/images/angle_grinder_2.png'] },
  { id: 4,  model: 'SK-531', name: 'Marble Cutter',       category: 'Grinders', price: 6999, description: 'Precision marble and tile cutting machine',                         images: ['/images/marble_cutter_1.png',        '/images/marble_cutter_2.png'] },
  { id: 5,  model: 'SK-533', name: 'Circular Saw',        category: 'Saws',     price: 3899, description: 'High-speed circular saw for clean cuts',                            images: ['/images/circular_saw_1.png',         '/images/circular_saw_2.png'] },
  { id: 6,  model: 'SK-535', name: 'Jig Saw',             category: 'Saws',     price: 2299, description: 'Precision jig saw for intricate cutting',                           images: ['/images/jig_saw_1.png',              '/images/jig_saw_2.png'] },
  { id: 7,  model: 'SK-538', name: 'Cut Off Machine',     category: 'Saws',     price: 9999, description: 'Industrial cut-off machine for metal and masonry',                  images: ['/images/cut_off_machine_1.png',      '/images/cut_off_machine_2.png'] },
  { id: 8,  model: 'SK-542', name: 'Demolition Hammer',   category: 'Hammers',  price: 5999, description: 'Heavy-duty demolition hammer for tough jobs',                       images: ['/images/demolition_hammer_1.png',    '/images/demolition_hammer_2.png'] },
  { id: 9,  model: 'SK-522', name: 'Rotary Hammer',       category: 'Hammers',  price: 5599, description: 'Powerful rotary hammer for concrete and masonry',                   images: ['/images/rotary_hammer_1.png',        '/images/rotary_hammer_2.png'] },
  { id: 10, model: 'SK-537', name: 'Electric Mixer',      category: 'Drills',   price: 4499, description: 'Heavy-duty electric mixer for concrete and mortar',                 images: ['/images/electric_mixer_1.png',       '/images/electric_mixer_2.png'] },
  { id: 11, model: 'SK-527', name: 'Electric Blower',     category: 'Drills',   price: 1999, description: 'Powerful electric blower for cleaning and air circulation',         images: ['/images/electric_blower_1.png',      '/images/electric_blower_2.png'] },
  { id: 12, model: 'SK-525', name: 'Electric Planner',    category: 'Saws',     price: 2799, description: 'Precision electric planner for woodworking',                        images: ['/images/electric_planner_1.png',     '/images/electric_planner_2.png'] },
];

// GET /api/products
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let result = products;
  if (category && category !== 'All') result = result.filter(p => p.category === category);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  res.json(result);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
