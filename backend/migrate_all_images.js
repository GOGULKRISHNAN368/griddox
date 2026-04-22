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

const Banner = mongoose.model('Banner', new mongoose.Schema({
  imageUrl: String
}, { strict: false }));

const Reel = mongoose.model('Reel', new mongoose.Schema({
  videoUrl: String
}, { strict: false }));

const InstagramPost = mongoose.model('InstagramPost', new mongoose.Schema({
  imageUrl: String
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

    // 2. Migrate Banners
    const banners = await Banner.find();
    console.log(`Migrating ${banners.length} Banners...`);
    for (const banner of banners) {
      if (banner.imageUrl && banner.imageUrl.startsWith('data:')) {
        console.log(`Uploading Banner: ${banner.title || banner._id}`);
        const result = await cloudinary.uploader.upload(banner.imageUrl, { folder: 'gridox_banners' });
        banner.imageUrl = result.secure_url;
        await banner.save();
      }
    }

    // 3. Migrate Instagram Posts
    const instaPosts = await InstagramPost.find();
    console.log(`Migrating ${instaPosts.length} Instagram Posts...`);
    for (const post of instaPosts) {
      if (post.imageUrl && post.imageUrl.startsWith('data:')) {
        console.log(`Uploading Instagram Post: ${post._id}`);
        const result = await cloudinary.uploader.upload(post.imageUrl, { folder: 'gridox_instagram' });
        post.imageUrl = result.secure_url;
        await post.save();
      }
    }

    // 4. Migrate Products
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

    // 5. Migrate Reels (Video)
    const reels = await Reel.find();
    console.log(`Migrating ${reels.length} Reels...`);
    for (const reel of reels) {
      if (reel.videoUrl && reel.videoUrl.startsWith('data:')) {
        console.log(`Uploading Reel Video: ${reel._id}`);
        try {
          const result = await cloudinary.uploader.upload(reel.videoUrl, { 
            folder: 'gridox_reels',
            resource_type: 'video'
          });
          reel.videoUrl = result.secure_url;
          await reel.save();
        } catch (e) {
          console.error(`Failed video upload for ${reel._id}`, e.message);
        }
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

