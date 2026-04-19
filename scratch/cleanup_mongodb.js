const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

async function cleanupDatabase() {
  try {
    let MONGODB_URI = process.env.MONGODB_URI;
    if (MONGODB_URI && (!MONGODB_URI.includes('.net/') || MONGODB_URI.endsWith('.net/'))) {
        MONGODB_URI = MONGODB_URI.replace('.net/?', '.net/gridox_db?');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const CategorySchema = new mongoose.Schema({
        name: String,
        fullImage: String,
        image: String,
        thumbnailImage: String
    });

    const Category = mongoose.model('Category', CategorySchema);

    console.log('Finding all categories with large background images...');
    const categories = await Category.find({});
    
    let count = 0;
    for (const cat of categories) {
        // We only want to keep thumbnailImage.
        // We delete fullImage and image to save massive amounts of space.
        const update = {
            $unset: { 
                fullImage: "", 
                image: "" 
            }
        };
        
        await Category.updateOne({ _id: cat._id }, update);
        count++;
    }

    console.log(`SUCCESS: Cleaned up ${count} categories. All large background data has been removed.`);
    process.exit(0);
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupDatabase();
