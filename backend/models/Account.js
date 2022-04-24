const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const { Schema, model } = mongoose

const accountSchema = new Schema({
  username: { type: String, required: true },
  googleID: { type: String, required: true },
})

accountSchema.plugin(findOrCreate)

const Account = model('Account', accountSchema)

module.exports = Account
