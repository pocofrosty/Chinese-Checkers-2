const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const Account = require('../models/Account')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  Account.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(new GoogleStrategy({
  callbackURL: 'http://localhost:3000/auth/google/redirect',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
  const a = await Account.findOrCreate(
    { googleID: profile.id },
    { username: profile.displayName },
  )
    .then(doc => doc)
  done(null, profile)
}))
