const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '../.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const ReelSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  videoType: { type: String, default: 'video/mp4' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  category: String,
  createdAt: { type: Date, default: Date.now }
});

const Reel = mongoose.model('Reel', ReelSchema);

async function migrateBase64() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    const base64Reels = await Reel.find({ videoUrl: { $regex: /^data:/ } });
    console.log(`Found ${base64Reels.length} Base64 reels to migrate.`);

    for (const reel of base64Reels) {
      console.log(`Uploading Base64 reel ${reel._id} to Cloudinary...`);
      
      const result = await cloudinary.uploader.upload(reel.videoUrl, {
        resource_type: 'video',
        folder: 'gridox_reels'
      });

      console.log(`Uploaded! URL: ${result.secure_url}`);

      reel.videoUrl = result.secure_url;
      await reel.save();
      console.log(`Database updated for reel ${reel._id}`);
    }

    console.log('Base64 migration completed.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateBase64();
