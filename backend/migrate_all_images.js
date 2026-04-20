const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '../.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Define Schemas for migration
const Product = mongoose.model('Product', new mongoose.Schema({
  image: String,
  gallery: [String]
}, { strict: false }));

const Category = mongoose.model('Category', new mongoose.Schema({
  image: String,
  thumbnailImage: String,
  fullImage: String
}, { strict: false }));

async function migrateAll() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('--- GLOBAL CLOUD MIGRATION STARTED ---');

    // 1. Migrate Categories
    const categories = await Category.find();
    console.log(`Migrating ${categories.length} Categories...`);
    for (const cat of categories) {
      if (cat.thumbnailImage && cat.thumbnailImage.startsWith('data:')) {
        console.log(`Uploading Category image: ${cat.name || cat._id}`);
        const result = await cloudinary.uploader.upload(cat.thumbnailImage, { folder: 'gridox_categories' });
        cat.thumbnailImage = result.secure_url;
        cat.image = result.secure_url; // legacy
        await cat.save();
      }
    }

    // 2. Migrate Products
    const products = await Product.find();
    console.log(`Migrating ${products.length} Products...`);
    for (const prod of products) {
      let updated = false;
      
      // Main Image
      if (prod.image && prod.image.startsWith('data:')) {
        console.log(`Uploading Product main image: ${prod.name || prod._id}`);
        try {
            const result = await cloudinary.uploader.upload(prod.image, { folder: 'gridox_products' });
            prod.image = result.secure_url;
            updated = true;
        } catch (e) {
            console.error(`Failed main image for ${prod._id}`, e.message);
        }
      }

      // Gallery Images
      if (prod.gallery && prod.gallery.length > 0) {
        console.log(`Checking galllery for: ${prod.name || prod._id}`);
        const newGallery = [];
        let galleryUpdated = false;
        
        for (const img of prod.gallery) {
          if (img && img.startsWith('data:')) {
            try {
                const result = await cloudinary.uploader.upload(img, { folder: 'gridox_products' });
                newGallery.push(result.secure_url);
                galleryUpdated = true;
            } catch (e) {
                console.error(`Failed gallery image for ${prod._id}`, e.message);
                newGallery.push(img); // keep old if failed
            }
          } else {
            newGallery.push(img);
          }
        }
        
        if (galleryUpdated) {
          prod.gallery = newGallery;
          updated = true;
        }
      }

      if (updated) {
        await prod.save();
        console.log(`Saved product ${prod._id}`);
      }
    }

    console.log('--- GLOBAL MIGRATION SUCCESSFULLY COMPLETED ---');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateAll();
