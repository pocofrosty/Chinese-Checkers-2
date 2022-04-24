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

router.get('/session', (req, res) => {
  res.json(req.session)
})

// export
module.exports = router
