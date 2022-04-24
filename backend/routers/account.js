// importing packages
const express = require('express')
const passport = require('passport')

const Account = require('../models/Account')

const router = express.Router()

// routes

router.get('/', passport.authenticate('google', { scope: ['profile'] }), (req, res) => {
  res.send('Success')
})

// export
module.exports = router
