const isAuthenticated = (req, res, next) => {
  if (req.session.username) {
    next()
  } else {
    next(new Error('Not Logged In'))
  }
}

module.exports = isAuthenticated
