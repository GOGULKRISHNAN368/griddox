const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

// MongoDB Connection
let MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI && (!MONGODB_URI.includes('.net/') || MONGODB_URI.endsWith('.net/'))) {
    MONGODB_URI = MONGODB_URI.replace('.net/?', '.net/gridox_db?');
}

const BannerSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  link: String,
  createdAt: { type: Date, default: Date.now }
});

const Banner = mongoose.model('Banner', BannerSchema);

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to Atlas for seeding...');

    const assetsDir = path.join(__dirname, '../clientwebsite/src/assets');
    const files = ['hero-1.jpg', 'hero-2.jpg', 'hero-3.png'];
    
    for (const file of files) {
      const filePath = path.join(assetsDir, file);
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        const base64 = `data:image/${path.extname(file).slice(1)};base64,${data.toString('base64')}`;
        
        await Banner.create({
          title: `Initial ${file}`,
          imageUrl: base64,
          link: '#'
        });
        console.log(`Seeded: ${file}`);
      }
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();
