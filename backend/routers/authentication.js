// importing packages
const express = require('express')
const passport = require('passport')

const router = express.Router()

// routes

router.get('/google', passport.authenticate('google', { scope: ['profile'] }), (req, res) => {
  res.send('Success')
})

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  req.session.username = req.user.displayName
  res.redirect('http://localhost:3000/gamelist')
})

// export
module.exports = router
