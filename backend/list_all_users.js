const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const User = require('./models/User');

async function listAllUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({});
    console.log('--- All Registered Users ---');
    if (users.length > 0) {
      users.forEach(u => {
        const method = u.googleId ? 'Google' : 'Manual';
        const hasPass = u.password ? 'YES' : 'NO';
        console.log(`Email: ${u.email} | Method: ${method} | Has Password Hash: ${hasPass}`);
      });
    } else {
      console.log('No users found in database.');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

listAllUsers();
