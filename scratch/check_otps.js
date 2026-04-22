const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const OTPSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, default: Date.now }
});

const OTP = mongoose.model('OTP', OTPSchema);

async function checkOTPs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    const otps = await OTP.find().sort({ createdAt: -1 }).limit(5);
    console.log('Latest OTPs:', otps);
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkOTPs();
