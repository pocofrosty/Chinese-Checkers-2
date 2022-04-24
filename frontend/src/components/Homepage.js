import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Title from './subcomponents/Title'
import logo from '../assets/logo.png'

const HomePage = () => (
  <div className="grid grid-cols-1 py-2 px-3 px-16">
    <img src={logo} alt="" />
    <Title text="Home Page of Chinese Checkers" />
    <br />
    <Link className="text-blue-400" to="/signup"> Signup </Link>
    <br />
    <Link className="text-blue-400" to="/login"> Login </Link>
  </div>
)

export default HomePage
