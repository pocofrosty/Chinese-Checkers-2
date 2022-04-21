const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_DATABASE

console.log(process.env.MONGO_DATABASE)

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err.message)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
