import React from 'react'
import axios from 'axios'

const GameButton = ({
  gameName, setCurrentGame,
}) => (
  <button
    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={async () => {
      await axios.post('/gameboard/findgame', ({ name: gameName })).then(r => {
        setCurrentGame(r.data.name)
      })
    }}
  >
    {`Game: ${gameName}`}
  </button>
)

export default GameButton
