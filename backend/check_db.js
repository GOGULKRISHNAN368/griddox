const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: '../.env' });

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to:', mongoose.connection.name);
    const users = await User.find({}, 'name email');
    console.log('Current Users in DB:', users);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkUsers();
