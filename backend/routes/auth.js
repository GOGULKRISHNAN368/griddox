const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');

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

// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, password });
    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    
    await user.save();

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
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

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
  console.log('--- GOOGLE AUTH START ---');
  
  // Determine which frontend the user came from
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

  // WRAP Passport in a try/catch to see why it might be failing
  try {
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        state: true
    })(req, res, (err) => {
        if (err) {
            console.error('Passport Auth Error:', err);
            return res.status(500).json({ 
                error: 'Passport failed to start', 
                details: err.message,
                stack: err.stack 
            });
        }
        next();
    });
  } catch (err) {
    console.error('Internal Auth Error:', err);
    res.status(500).json({ error: 'Internal server error during auth start', details: err.message });
  }
});

router.get('/google/callback', (req, res, next) => {
  console.log('--- GOOGLE AUTH CALLBACK RECEIVED ---');

  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/auth?error=google_failed`, 
    session: false
  })(req, res, next);
}, async (req, res) => {
  console.log('--- GOOGLE AUTH SUCCESS ---');
  try {
    const { accessToken, refreshToken } = generateTokens(req.user);
    const redirectTo = req.cookies.auth_redirect_to || process.env.FRONTEND_URL;
    
    // Clear the redirect cookie
    res.clearCookie('auth_redirect_to', { secure: true, sameSite: 'none' });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect(`${redirectTo}/`);
  } catch (error) {
    const fallback = req.cookies.auth_redirect_to || process.env.FRONTEND_URL;
    res.redirect(`${fallback}/auth?error=token_err`);
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('accessToken', { secure: true, sameSite: 'none' });
  res.clearCookie('refreshToken', { secure: true, sameSite: 'none' });
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
