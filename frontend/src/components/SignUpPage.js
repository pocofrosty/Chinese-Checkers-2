import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignUpButton from './subcomponents/SignUpButton'

import TextBox from './subcomponents/TextBox'
import Title from './subcomponents/Title'

const SignUpPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 py-2 px-3 px-16">
      <Title className="text-left font-bold text-3xl" text="Sign Up" />
      <br />
      <label> Username: </label>
      <br />
      <TextBox backgroundName="Username" setText={setUsername} />
      <br />
      <label> Password: </label>
      <br />
      <TextBox backgroundName="Password" setText={setPassword} />
      <br />
      <SignUpButton navigate={navigate} username={username} password={password} />
      <br />
      <label> Already have an account? </label>
      <Link className="text-blue-400" to="/login"> Login</Link>
    </div>
  )
}

export default SignUpPage
