// import packages
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieSession = require('cookie-session')
const http = require('http') // require the vanilla http server
const { Server } = require('socket.io') // require socket.io

// import routers

const AuthenticationRouter = require('./routers/authentication')
const GameboardRouter = require('./routers/gameboard')
const ProfileRouter = require('./routers/profile')
const UserRouter = require('./routers/user')

// Environmental Variables Set-up
dotenv.config({ path: `${__dirname}/.env` })

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_DATABASE_URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// passport setup

const PassportSetup = require('./authentication/passport-setup')

// app
const app = express()
const server = http.createServer(app) // create our server
const io = new Server(server) // create our IO sockets

// socket io connection
io.on('connection', socket => {
  console.log('a user is connected')
  socket.on('message', data => {
    io.emit('message', data)
  })
})

// Some middleware for parsing
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

// cookie-session
app.use(cookieSession({
  keys: [process.env.COOKIE_KEY],
  maxAge: 60 * 60 * 1000, // 1 Hour
}))

// routers
app.use('/auth', AuthenticationRouter)
app.use('/profile', ProfileRouter)
app.use('/gameboard', GameboardRouter)
app.use('/user', UserRouter)

// default error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err.message)
})

// favicon.ico call for tab logo
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// run the backend server at PORT 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
