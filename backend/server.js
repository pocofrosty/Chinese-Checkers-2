const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config({ path: `${__dirname}/.env` })

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_DATABASE_URI

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
