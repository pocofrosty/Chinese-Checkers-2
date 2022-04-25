import axios from 'axios'
import React, { useState, useEffect } from 'react'

import {
  Pattern, HexGrid, Layout, Hexagon, Text, HexUtils, Hex,
} from 'react-hexgrid'
import redmarble from '../assets/red-marble.png'
import purplemarble from '../assets/purple-marble.png'
import greenmarble from '../assets/green-marble.png'
import yellowmarble from '../assets/yellow-marble.png'
import bluemarble from '../assets/blue-marble.png'
import orangemarble from '../assets/orange-marble.png'
import circled from '../assets/circled.png'

import HexUtil from '../../../backend/util/HexUtil'

const Gameview = ({ currentGame, getGameByName }) => {
  const [currentlySelected, setCurrentlySelected] = useState('')

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

  getGameByName(currentGame).then(r => console.log(r))
  return (
    <>
      <label>
        {`Current Game: ${currentGame}`}
      </label>
      {/* <HexGrid width={1000} height={1000}>
        <Layout size={{ x: 3, y: 3 }} flat={false} spacing={1.02} origin={{ x: 0, y: 0 }}>
          {(currentGame.board) ? Object.keys(currentGame.board).map(tuple => {
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
      </HexGrid> */}

    </>
  )
}
export default Gameview
