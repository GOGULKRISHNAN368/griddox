const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const CATEGORY_ASSETS_DIR = path.join(__dirname, '../clientwebsite/src/assets');

// MongoDB Connection
let MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI && (!MONGODB_URI.includes('.net/') || MONGODB_URI.endsWith('.net/'))) {
    MONGODB_URI = MONGODB_URI.replace('.net/?', '.net/gridox_db?');
}

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  slug: String,
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', CategorySchema);

const categoryMigrationData = [
  { name: "PEPLUM CO-ORDS", file: "cat_peplum_coords_1775373099016.png", desc: "Shop premium Peplum Co-ords for women. Our designer-crafted coordinating sets blend modern silhouettes with traditional elegance, perfect for festive events and contemporary ethnic wear." },
  { name: "COTTON KURTI SET", file: "cat_cotton_kurti_1775373114325.png", desc: "Discover breathable Cotton Kurti Sets online. High-quality cotton fabrics, intricate prints, and comfortable fits designed for daily casual wear and office elegance." },
  { name: "PEPLUM TOPS", file: "cat_peplum_tops_1775373133551.png", desc: "Trendy Peplum Tops for a stylish fusion look. Pair these versatile designer tops with jeans or ethnic bottoms for a chic, modern appearance in premium fabrics." },
  { name: "RAW SILK SET", file: "cat_raw_silk_1775373150282.png", desc: "Luxurious Raw Silk Sets for weddings and special occasions. Experience the rich texture and royal feel of high-end silk garments tailored to perfection for the modern woman." },
  { name: "MATERNITY WEAR", file: "cat_maternity_1775373167092.png", desc: "Comfortable and stylish Maternity Wear for expecting mothers. Functional designs, soft fabrics, and flattering silhouettes that keep you fashionable through every trimester." },
  { name: "LOUNGE WEAR", file: "cat_lounge_wear_1775373183467.png", desc: "Premium Women's Lounge Wear for ultimate comfort. Stay chic at home with our collection of soft, breathable, and stylish sets designed for relaxation without compromising on style." },
  { name: "BOTTOM WEAR", file: "cat_bottom_wear_1775373197874.png", desc: "Versatile Bottom Wear including ankle-length leggings, palazzos, and ethnic trousers. Perfectly tailored basics to complete any ethnic or fusion outfit." }
];

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas for migration');

    // Clear existing categories to avoid duplicates during this specific migration
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    for (const item of categoryMigrationData) {
      const filePath = path.join(CATEGORY_ASSETS_DIR, item.file);
      if (fs.existsSync(filePath)) {
        console.log(`Migrating ${item.name}...`);
        const fileData = fs.readFileSync(filePath);
        const base64Image = `data:image/png;base64,${fileData.toString('base64')}`;
        
        const slug = item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        await new Category({
          name: item.name,
          image: base64Image,
          description: item.desc,
          slug: slug
        }).save();
        
        console.log(`Successfully migrated ${item.name}. Deleting local file...`);
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
