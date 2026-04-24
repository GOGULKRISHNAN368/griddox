const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config({ path: '../.env' });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    const adminName = 'gridoxclothing';
    const adminEmail = 'admin@gridox.com';
    const adminPassword = 'admin@123';

    // Check if admin already exists
    let admin = await User.findOne({ name: adminName });
    
    if (admin) {
      console.log('Admin user already exists. Updating password...');
      admin.password = adminPassword; // Pre-save hook will hash it
      await admin.save();
      console.log('Admin password updated successfully!');
    } else {
      console.log('Creating new admin user...');
      admin = new User({
        name: adminName,
        email: adminEmail,
        password: adminPassword
      });
      await admin.save();
      console.log('Admin user created successfully!');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
