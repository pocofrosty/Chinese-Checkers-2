import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Title from './subcomponents/Title'

const GameList = ({
  currentUsername, gameList, setGameList, setCurrentGame,
}) => (
  <div className="grid grid-cols-1 py-2 px-3 px-16">
    <Title className="font-bold text-3xl" text="List of Games" />
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        await axios.get('/gameboard/games').then(r => setGameList(r.data))
      }}
    >
      {' '}
      Refresh
      {' '}

    </button>
    <br />
    {gameList.map(game => (
      <>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setCurrentGame(game)
          }}
        >
          {' '}
          {`Game: ${game.name}`}
          {' '}
        </button>
        <br />

      </>
    ))}
  </div>
)

export default GameList
