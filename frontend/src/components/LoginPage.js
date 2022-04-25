import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import TextBox from './subcomponents/TextBox'
import Title from './subcomponents/Title'
import GoogleLoginButton from './subcomponents/GoogleLoginButton'
import LoginButton from './subcomponents/LoginButton'

const LoginPage = ({ setCurrentUsername }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 py-2 px-3 px-16">
      <Title className="text-left font-bold text-3xl" text="Login Page" />
      <br />
      <label> Username: </label>
      <br />
      <TextBox backgroundName="Username" setText={setUsername} />
      <br />
      <label> Password: </label>
      <br />
      <TextBox backgroundName="Password" setText={setPassword} />
      <br />
      <LoginButton username={username} password={password} setCurrentUsername={setCurrentUsername} switchScreens={navigate} />
      <br />
      <GoogleLoginButton setCurrentUsername={setCurrentUsername} />
      <label> Don&apos;t have an account? </label>
      <Link className="text-blue-400" to="/signup"> Sign Up </Link>
    </div>
  )
}

export default LoginPage
