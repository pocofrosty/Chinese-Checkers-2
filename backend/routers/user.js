const express = require('express')

const User = require('../models/user')
const isAuthenticated = require('../authentication/isAuthenticated')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { body: { username, password } } = req
  try {
    await User.create({ username, password })
    res.send('Successful Signup')
  } catch (err) {
    next(new Error('Username Already Taken'))
  }
})

router.post('/login', async (req, res, next) => {
  const { body: { username: loginUsername, password: loginPassword } } = req
  try {
    const user = await User.findOne({ username: loginUsername })
    if (user.password === loginPassword) {
      req.session.username = loginUsername
      res.send('Successful Login')
    } else {
      next(new Error('Failed to login'))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/logout', isAuthenticated, (req, res, next) => {
  try {
    req.session = null
    res.send('Log out success')
  } catch (err) {
    next(err)
  }
})

router.get('/verify', (req, res) => {
  if (req.session.username) {
    res.json({ LoggedIn: true })
  } else {
    res.json({ LoggedIn: false })
  }
})

router.get('/currentLogin', (req, res) => {
  try {
    res.json(req.session.username)
  } catch (err) {
    res.json('')
  }
})

module.exports = router
