const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const { Schema, model } = mongoose

const gameboardSchema = new Schema({
  name: { type: String, unique: true },
  board: {
    type: [{
      tuple: { type: String },
      color: { type: String },
    }],
  },
  turn: { type: Number },
})

gameboardSchema.plugin(findOrCreate)

const Gameboard = model('Gameboard', gameboardSchema)

module.exports = Gameboard
