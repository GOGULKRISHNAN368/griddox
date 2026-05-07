const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const User = require('./models/User');

async function findUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: 'gogulkrishnan368@gmail.com' });
    if (user) {
      console.log('User found:');
      console.log('Email:', user.email);
      console.log('Has Password:', !!user.password);
      console.log('Google ID:', user.googleId || 'None');
      console.log('Created At:', user.createdAt);
    } else {
      console.log('User not found.');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

findUser();
