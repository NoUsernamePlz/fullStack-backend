const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Googleuser = require('./models/googleuser');

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/google/callback',
  scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, done) => {
  try{
    const newUser = new Googleuser({
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value
    });
    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
