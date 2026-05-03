const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

passport.use(new GoogleStrategy({
  clientID: (process.env.GOOGLE_CLIENT_ID || "").trim(),
  clientSecret: (process.env.GOOGLE_CLIENT_SECRET || "").trim(),
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
  proxy: true
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      console.log(`[PASSPORT] Google profile received: ${profile.displayName} (${email})`);

      if (!email) {
        console.error('[PASSPORT] Google profile did not contain an email');
        return done(new Error('Email not provided by Google'), null);
      }

      // 1. Check for existing user by Google ID
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // 2. Check for existing user by Email (to prevent duplicates)
        console.log(`[PASSPORT] Searching for user by email: ${email}`);
        user = await User.findOne({ email });

        if (user) {
          console.log(`[PASSPORT] Linking Google ID to existing user: ${email}`);
          // Link Google account to existing email account
          user.googleId = profile.id;
          if (!user.name) user.name = profile.displayName;
          await user.save();
        } else {
          console.log(`[PASSPORT] Creating new Google user: ${email}`);
          // 3. Create new user if not found (Standard for Social Login)
          user = new User({
            name: profile.displayName,
            email: email,
            googleId: profile.id
          });
          await user.save();
        }
      } else {
        console.log(`[PASSPORT] Found existing Google user: ${email}`);
      }
      return done(null, user);
    } catch (err) {
      console.error('[PASSPORT] Google strategy error:', err);
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
