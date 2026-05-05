const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

async function diagnose() {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI.split('@')[1]); // Log host only for safety
    await mongoose.connect(process.env.MONGODB_URI);
    
    const email = 'gogulpvt@gmail.com';
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (!user) {
      console.log('ERROR: User not found in database.');
    } else {
      console.log('User Found:', user.email);
      console.log('Stored Password Hash:', user.password ? user.password.substring(0, 10) + '...' : 'NONE');
      
      const testPass = '9788917144';
      const isMatch = await bcrypt.compare(testPass, user.password);
      console.log('Comparison Result with "9788917144":', isMatch ? 'MATCH' : 'MISMATCH');
      
      if (!isMatch) {
        console.log('Updating password to ensure it matches...');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(testPass, salt);
        await user.save();
        console.log('Password successfully updated and hashed.');
      }
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Diagnostic Error:', error);
  }
}

diagnose();
