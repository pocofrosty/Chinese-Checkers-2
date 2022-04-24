const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const Account = require('../models/Account')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  Account.findById(id).then(user => {
    done(null, user.id)
  })
})

passport.use(new GoogleStrategy({
  callbackURL: 'http://localhost:3000/auth/google/redirect',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  console.log(1)
  //   console.log(Account.findOne({ googleID: '100025941064471211927' }))
  //   Account.findOrCreate({ googleID: profile.id }, (err, account) => {
  //     new Account({
  //       username: profile.displayName,
  //       googleID: profile.id,
  //     }).save().then(console.log(1))
  //   })

  done(null, profile)
}))
