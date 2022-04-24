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
import HexUtil, { getAdjacentHexes } from '../../backend/util/HexUtil'

import redmarble from './assets/red-marble.png'
import purplemarble from './assets/purple-marble.png'
import greenmarble from './assets/green-marble.png'
import yellowmarble from './assets/yellow-marble.png'
import bluemarble from './assets/blue-marble.png'
import orangemarble from './assets/orange-marble.png'
import circled from './assets/circled.png'

// eslint-disable-next-line no-undef
export default App = () => {
  const [currentUser, setCurrentUser] = useState('')
  const [gameList, setGameList] = useState({})
  const [currentGame, setCurrentGame] = useState({ })
  const [currentlySelected, setCurrentlySelected] = useState('')
  const possibleMoves = useMemo(() => {
    const moves = []
    // intial directly adjacent squares
    const adjacentHexes = HexUtil.getAdjacentHexes(currentlySelected)
    try {
      const hexCoordinates = Object.keys(currentGame.board)
      for (const hex of adjacentHexes) {
        const tuple = HexUtil.convertHexToTuple(hex)
        if (hexCoordinates.includes(tuple)) {
          moves.push(hex)
        }
      }
    } catch (e) {
      console.log(null)
    }

    // add moves from jumping
    HexUtil.getReachableByJumping(currentlySelected, currentGame.board)

    return moves
  }, [currentlySelected])

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
      loadGameByID('test3').then(game => {
        setCurrentGame(game)
      })
    })
  }, [])

  // local asset imports
  const initializePatterns = () => (
    <>
      <Pattern id="red" size={{ x: 2.7, y: 3 }} link={redmarble} />
      <Pattern id="blue" size={{ x: 2.7, y: 3 }} link={bluemarble} />
      <Pattern id="green" size={{ x: 2.7, y: 3 }} link={greenmarble} />
      <Pattern id="orange" size={{ x: 2.7, y: 3 }} link={orangemarble} />
      <Pattern id="yellow" size={{ x: 2.7, y: 3 }} link={yellowmarble} />
      <Pattern id="purple" size={{ x: 2.7, y: 3 }} link={purplemarble} />
      <Pattern id="circled" size={{ x: 2.7, y: 3 }} link={circled} />
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
          >
            <Text>
              {' '}
              {HexUtils.getID(hex)}
              {' '}
            </Text>
          </Hexagon>
        )
      })
        : null}
      {initializePatterns}
    </Layout>
  </HexGrid>
)
