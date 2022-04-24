const mongoose = require('mongoose')

const { Schema, model } = mongoose

const accountSchema = new Schema({
  username: { type: String, required: true },
  googleid: { type: String, required: true },
})

const Account = model('Account', accountSchema)

module.exports = Account
