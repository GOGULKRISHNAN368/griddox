const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const MONGODB_URI = process.env.MONGODB_URI.replace('.net/?', '.net/gridox_db?');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  discount: String,
  isNew: { type: Boolean, default: false },
  image: String,
  category: { type: String, default: 'new-arrivals' },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

const seedProducts = [
  {
    name: "Minimal blush",
    price: 2299,
    originalPrice: 2799,
    discount: "18%",
    isNew: true,
    localPath: '../clientwebsite/src/assets/hero-1.jpg'
  },
  {
    name: "Breeze bloom kurta set",
    price: 2149,
    originalPrice: 2499,
    discount: "14%",
    isNew: true,
    localPath: '../clientwebsite/src/assets/cat-kurta-set-v2.jpg'
  },
  {
    name: "Festive silk top",
    price: 1499,
    originalPrice: 1999,
    discount: "25%",
    isNew: false,
    localPath: '../clientwebsite/src/assets/cat-dresses-v2.jpg'
  },
  {
    name: "Modern ethnic dress",
    price: 3299,
    originalPrice: 3999,
    discount: "17%",
    isNew: false,
    localPath: '../clientwebsite/src/assets/cat-kurtas-v2.jpg'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas for seeding...');

    // Clear existing new-arrivals to avoid duplicates during this migration
    await Product.deleteMany({ category: 'new-arrivals' });
    console.log('Cleared existing new-arrivals products.');

    for (const p of seedProducts) {
      const fullPath = path.join(__dirname, p.localPath);
      const bitmap = fs.readFileSync(fullPath);
      const base64 = `data:image/jpeg;base64,${bitmap.toString('base64')}`;
      
      const newProduct = new Product({
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        discount: p.discount,
        isNew: p.isNew,
        image: base64,
        category: 'new-arrivals'
      });

      await newProduct.save();
      console.log(`Seeded: ${p.name}`);
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
