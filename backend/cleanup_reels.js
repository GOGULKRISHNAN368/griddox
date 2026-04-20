const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

async function cleanup() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Reel = mongoose.model('Reel', new mongoose.Schema({ videoUrl: String }));
    const result = await Reel.deleteMany({ videoUrl: { $regex: /^data:/ } });
    console.log(`Deleted ${result.deletedCount} broken Base64 reels.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

cleanup();
