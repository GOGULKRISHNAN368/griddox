const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const User = require('./models/User');

async function listManualUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({ password: { $exists: true, $ne: null, $ne: '' } });
    console.log('--- Manual Registration Users ---');
    if (users.length > 0) {
      users.forEach(u => {
        console.log(`Email: ${u.email} | Created: ${u.createdAt}`);
      });
    } else {
      console.log('No manual registration users found.');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

listManualUsers();
