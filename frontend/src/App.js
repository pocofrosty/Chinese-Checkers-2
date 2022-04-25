/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Routes, Route, Outlet,
} from 'react-router-dom'

import { io } from 'socket.io-client'
import Gameview from './components/Gameview'
import HomePage from './components/Homepage'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import GameList from './components/GameList'

const socket = io('http://localhost:3000')

export default App = () => {
  const [gameList, setGameList] = useState([])
  const [currentGame, setCurrentGame] = useState({})

  const [currentUsername, setCurrentUsername] = useState('')

  // // functions to retrieve info
  getGameList = async () => {
    const res = await axios.get('/gameboard/games')
    setGameList(res.data)
    return res.data
  }

  getGameByName = async name => {
    for (const idx in gameList) {
      if (gameList[idx].name === name) {
        setCurrentGame(gameList[idx].name)
        return gameList[idx]
      }
    }
    return null
  }
  // runs once to initialize
  useEffect(() => {
    getGameList().then(() => {
      getGameByName(currentGame)
    })
  }, [])

  socket.on('refresh', data => {
    console.log(currentUsername)
    console.log('received from backend')
  })

  return (
    <div>
      <Routes path="/" element={<Layout2 />}>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage setCurrentUsername={setCurrentUsername} />} />
        <Route path="gamelist" element={<GameList currentUsername={currentUsername} gameList={gameList} setGameList={setGameList} setCurrentGame={setCurrentGame} />} />
        <Route path="gameview" element={<Gameview currentGame={currentGame} getGameByName={getGameByName} />} />
        <Route path="" element={<HomePage />} />
        <Route path="*" element={<ErrorPage currentText={currentGame} />} />
      </Routes>
    </div>
  )
}
const Layout2 = () => (
  <div>
    <Outlet />
  </div>
)

const ErrorPage = ({ currentText }) => (
  <div>
    <h1>
      {`Currently Logged in: ${currentText}`}
    </h1>
  </div>
)
