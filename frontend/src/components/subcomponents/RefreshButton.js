import React from 'react'
import axios from 'axios'

const RefreshButton = ({
  setGameList,
}) => (
  <button
    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={async () => {
      await axios.get('/gameboard/games').then(res => {
        setGameList(res.data)
      })
    }}
  >
    Refresh Game List
  </button>
)

export default RefreshButton
