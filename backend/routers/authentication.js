// importing packages
const express = require('express')
const passport = require('passport')

const Account = require('../models/Account')

const router = express.Router()

// routes

router.get('/google', passport.authenticate('google', { scope: ['profile'] }), (req, res) => {
  res.send('Success')
})

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/temp')
})

// export
module.exports = router
