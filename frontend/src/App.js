/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import React, { useEffect, useMemo, useState } from 'react'
import {
  Routes, Route, Outlet,
} from 'react-router-dom'
import axios from 'axios'
import {
  Pattern, HexGrid, Layout, Hexagon, Text, HexUtils, Hex,
} from 'react-hexgrid'
import HexUtil, { adjacentHexes } from '../../backend/util/HexUtil'

// eslint-disable-next-line no-undef
export default App = () => {
  const [currentUser, setCurrentUser] = useState('')
  const [gameList, setGameList] = useState({})
  const [currentGame, setCurrentGame] = useState({})
  const [currentlySelected, setCurrentlySelected] = useState('')
  const possibleMoves = useMemo(() => {}, [currentlySelected])

  // eslint-disable-next-line no-undef
  getCurrentUser = async () => {
    const res = await axios.get('/auth/session')
    try {
      return res.data.passport.user
    } catch (e) {
      return null
    }
  }

  // Use GraphQL for below?
  getGames = async () => {
    const res = await axios.get('/gameboard/games')
    return res.data
  }

  loadGameByID = async name => {
    for (const key in gameList) {
      if (gameList[key].name === name) {
        return gameList[key]
      }
    }
    return {}
  }

  // why is this running twice
  useEffect(() => {
    getCurrentUser().then(res => {
      setCurrentUser(res)
    })
    getGames().then(res => {
      setGameList(res)
      loadGameByID('test2').then(game => {
        setCurrentGame(game)
      })
    })
  }, [])

  const initializePatterns = () => (
    <>
      <Pattern id="red" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/red-marble.PNG?raw=true" />
      <Pattern id="blue" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/blue-marble.PNG?raw=true" />
      <Pattern id="green" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/green-marble.PNG?raw=true" />
      <Pattern id="orange" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/orange-marble.PNG?raw=true" />
      <Pattern id="yellow" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/yellow-marble.PNG?raw=true" />
      <Pattern id="purple" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/purple-marble.PNG?raw=true" />
    </>
  )

  return (
    <div>
      <button onClick={() => {
        window.location.href = 'http://localhost:3000/auth/google'
      }}
      >
        Sign In with google
      </button>
      <br />
      <button onClick={async () => {
        console.log(currentUser)
      }}
      >
        Current User
      </button>
      {
      // temporary usage of hexgrid to visualize
      }
      <Routes path="/" element={<Layout2 />}>
        <Route path="temp" element={<ValidPage text={currentlySelected} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <HexGridPage
        currentBoard={currentGame.board}
        initializePatterns={initializePatterns()}
        currentlySelected={currentlySelected}
        setCurrentlySelected={setCurrentlySelected}
      />
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

const ValidPage = ({ text }) => (
  <div>
    <h1>
      {' '}
      {`Username: ${text}`}
      {' '}
    </h1>
  </div>
)

const HexGridPage = ({
  currentBoard, initializePatterns, currentlySelected, setCurrentlySelected,
}) => (
  // console.log(currentBoard)
  <HexGrid width={1000} height={1000}>
    <Layout size={{ x: 3, y: 3 }} flat={false} spacing={1.02} origin={{ x: 0, y: 0 }}>
      { (currentBoard) ? Object.keys(currentBoard).map(tuple => {
        const hex = HexUtil.convertTupleToHex(tuple)
        return (
          <Hexagon
            className=""
            key={`${hex.q}${hex.r}${hex.s}`}
            q={hex.q}
            r={hex.r}
            s={hex.s}
            fill={currentBoard[tuple].color}
            onClick={() => {
              setCurrentlySelected(tuple)
            }}
          />
        )
      })
        : null}
      {initializePatterns}
    </Layout>
  </HexGrid>
)
