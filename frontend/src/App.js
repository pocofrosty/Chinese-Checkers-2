/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import React, { useEffect, useMemo, useState } from 'react'
import {
  Routes, Route, Outlet,
} from 'react-router-dom'
import axios from 'axios'

import Gameview from './components/Gameview'
import HomePage from './components/Homepage'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import GameList from './components/GameList'

export default App = () => {
  const [gameList, setGameList] = useState({})
  const [currentGame, setCurrentGame] = useState({ name: 'test2' })

  const [currentUsername, setCurrentUsername] = useState('')
  const [currentlySelected, setCurrentlySelected] = useState('')

  return (
    <div>
      <Routes path="/" element={<Layout2 />}>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage setCurrentUsername={setCurrentUsername} />} />
        <Route path="gamelist" element={<GameList />} />
        <Route path="gameview" element={<Gameview />} />
        <Route path="" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}
const Layout2 = () => (
  <div>
    <Outlet />
  </div>
)

const ErrorPage = () => (
  <div>
    <h1> Invalid Site </h1>
  </div>
)
