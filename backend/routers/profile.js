// importing packages
const express = require('express')
const isAuthenticated = require('../authentication/isAuthenticated')

const router = express.Router()

// routes
router.get('/user', (req, res) => {
  res.send(req.session.user)
})

module.exports = router
