/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// importing packages
const express = require('express')
const HexUtil = require('../util/HexUtil')

const Gameboard = require('../models/Gameboard')

const router = express.Router()

// routes

// optimize
router.post('/newgame', (req, res) => {
  const { body: { name } } = req

  let hexagonData = {}

  // Generate tiles
  for (let i = -4; i < 9; i++) {
    for (let j = -4; j < 5 - i; j++) {
      const tuple = `(${i},${j},${-i - j})`
      const temp = hexagonData
      temp[tuple] = { color: null }
      hexagonData = temp
    }
  }
  for (let i = -8; i < 5; i++) {
    for (let j = -4 - i; j < 5; j++) {
      const tuple = `(${i},${j},${-i - j})`
      const temp = hexagonData
      temp[tuple] = { color: null }
      hexagonData = temp
    }
  }

  //   Assigning starting colors
  for (const obj in hexagonData) {
    const temp = HexUtil.convertTupleToHex(obj)

    // convert to switch statement
    if (temp.r <= -5) {
      hexagonData[obj].color = 'red'
    } else if (temp.r >= 5) {
      hexagonData[obj].color = 'green'
    } else if (temp.q <= -5) {
      hexagonData[obj].color = 'blue'
    } else if (temp.q >= 5) {
      hexagonData[obj].color = 'yellow'
    } else if (temp.s <= -5) {
      hexagonData[obj].color = 'orange'
    } else if (temp.s >= 5) {
      hexagonData[obj].color = 'purple'
    }
  }

  // Convert to Array
  const hexagonArray = []
  for (const key of Object.keys(hexagonData)) {
    hexagonArray.push({ tuple: key, color: hexagonData[key].color })
  }

  Gameboard.create({ name, board: hexagonArray, turn: 0 })
  res.send('success')
})

router.get('/games', async (req, res) => {
  const games = await Gameboard.find()
  res.json(games)
})

router.post('/findgame', async (req, res) => {
  const { body: { name } } = req
  const game = await Gameboard.findOne({ name })
  res.json(game)
})

// add validation
router.post('/validate', async (req, res) => {
  const {
    body: {
      start, end, color, name,
    },
  } = req
  const temp = await Gameboard.findOne({ name })
  for (const idx in temp.board) {
    if (temp.board[idx].tuple === start) {
      temp.board[idx].color = null
    } else if (temp.board[idx].tuple === end) {
      temp.board[idx].color = color
    }
  }
  await Gameboard.replaceOne({ name }, temp)
  res.send('success')
})

// export
module.exports = router
