import React from 'react'
import { useNavigate } from 'react-router-dom'

import Title from './subcomponents/Title'
import GameButton from './subcomponents/GameButton'
import RefreshButton from './subcomponents/RefreshButton'

const GameList = ({
  currentUsername, gameList, setGameList, setCurrentGame,
}) => (
  <div className="grid grid-cols-1 py-2 px-3 px-16">
    <Title className="font-bold text-3xl" text="List of Games" />
    <label>
      {' '}
      {`Current Username: ${currentUsername}`}
      {' '}
    </label>
    <RefreshButton setGameList={setGameList} />
    <br />
    { gameList.map(game => (
      <>
        <GameButton key={game._id} gameName={game.name} setCurrentGame={setCurrentGame} />
        <br />
      </>
    ))}
  </div>
)

export default GameList
