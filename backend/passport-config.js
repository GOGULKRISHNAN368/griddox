const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://griddox-1.onrender.com/api/auth/google/callback",
    proxy: true 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      
      // 1. Check for existing user by Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        // 2. Check for existing user by Email (to prevent duplicates)
        user = await User.findOne({ email });
        
        if (user) {
          // Link Google account to existing email account
          user.googleId = profile.id;
          if (!user.name) user.name = profile.displayName;
          await user.save();
        } else {
          // 3. Create new user if not found (Standard for Social Login)
          user = new User({
            name: profile.displayName,
            email: email,
            googleId: profile.id
          });
          await user.save();
        }
      }
      return done(null, user);
    } catch (err) {
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
