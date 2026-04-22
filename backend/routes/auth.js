const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const passport = require('passport');
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

// Helper to send OTP
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Gridox Fashion" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: 'Gridox - Your Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
        <h2 style="color: #ff0000; text-align: center;">Gridox Verification</h2>
        <p>Hello,</p>
        <p>Your verification code is:</p>
        <div style="font-size: 32px; font-weight: bold; text-align: center; padding: 10px; background: #f9f9f9; border-radius: 5px; color: #333; letter-spacing: 5px;">
          ${otp}
        </div>
        <p style="color: #666; font-size: 14px; text-align: center; margin-top: 20px;">
          This code will expire in 10 minutes. If you didn't request this, please ignore this email.
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Helper to generate tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// POST /send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // If login, check if user exists
    if (type === 'login') {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'No account found with this email' });
      }
    }

    // If signup, check if user already exists
    if (type === 'signup') {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB
    await OTP.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // Send Email
    console.log(`Sending OTP ${otp} to ${email}...`);
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully to your email' });
  } catch (error) {
    console.error('OTP SEND ERROR:', error);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
});

// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    
    if (!otp) return res.status(400).json({ message: 'OTP is required' });

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, password });
    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    
    await user.save();
    
    // Delete OTP after successful signup
    await OTP.deleteOne({ email });

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ message: 'User created successfully', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    // If OTP is not provided, it's the first step of login
    if (!otp) {
      // Generate and send OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await OTP.findOneAndUpdate(
        { email },
        { otp: generatedOtp, createdAt: Date.now() },
        { upsert: true, new: true }
      );
      await sendOTPEmail(email, generatedOtp);
      console.log(`Login OTP sent to ${email}`);
      return res.status(200).json({ message: 'OTP sent to your email', otpRequired: true });
    }

    // Verify OTP
    console.log(`Verifying Login OTP for ${email}: ${otp}`);
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      console.log(`Invalid OTP for ${email}`);
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    // Delete OTP after successful login
    await OTP.deleteOne({ email });

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* --- GOOGLE OAUTH ROUTES --- */

router.get('/google', (req, res, next) => {
  // Determine which frontend the user came from for redirection
  const referer = req.headers.referer || '';
  let targetFrontend = process.env.FRONTEND_URL;
  
  if (referer.includes('ownersite') || referer.includes('owner')) {
    targetFrontend = 'https://ownersite-psi.vercel.app';
  }

  // Save the target frontend in a short-lived cookie
  res.cookie('auth_redirect_to', targetFrontend, { 
    httpOnly: true, 
    secure: true, 
    sameSite: 'none', 
    maxAge: 5 * 60 * 1000 // 5 minutes
  });

  // Start Passport Auth with account selection forced
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    state: true,
    prompt: 'select_account' // <--- This forces Google to show the account list
  })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  console.log('--- GOOGLE AUTH CALLBACK RECEIVED ---');

  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/auth?error=google_failed`, 
    session: false
  })(req, res, next);
}, async (req, res) => {
  try {
    const userEmail = req.user.email || (req.user._json && req.user._json.email);
    console.log(`Google Auth Success for ${userEmail}. Sending OTP...`);

    // Generate and send OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.findOneAndUpdate(
      { email: userEmail },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );
    await sendOTPEmail(userEmail, otp);

    // Set a temporary cookie to identify the pending Google user
    res.cookie('pending_google_email', userEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 10 * 60 * 1000 // 10 minutes
    });

    console.log(`Redirecting to frontend with google_otp=true for ${userEmail}`);
    const redirectTo = req.cookies.auth_redirect_to || process.env.FRONTEND_URL;
    res.redirect(`${redirectTo}/auth?google_otp=true&email=${encodeURIComponent(userEmail)}`);
  } catch (error) {
    console.error('GOOGLE CALLBACK ERROR:', error);
    const fallback = req.cookies.auth_redirect_to || process.env.FRONTEND_URL;
    res.redirect(`${fallback}/auth?error=token_err`);
  }
});

// POST /google/verify-otp
router.post('/google/verify-otp', async (req, res) => {
  try {
    const { otp, email: emailFromBody } = req.body;
    const email = req.cookies.pending_google_email || emailFromBody;
    
    console.log(`Verifying Google OTP for ${email}: ${otp}`);

    if (!email) {
      console.log('No email found in session or body');
      return res.status(400).json({ message: 'Email session missing. Please try again.' });
    }

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    // Cleanup
    await OTP.deleteOne({ email });
    res.clearCookie('pending_google_email', { secure: true, sameSite: 'none' });

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('accessToken', { secure: true, sameSite: 'none' });
  res.clearCookie('refreshToken', { secure: true, sameSite: 'none' });
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
