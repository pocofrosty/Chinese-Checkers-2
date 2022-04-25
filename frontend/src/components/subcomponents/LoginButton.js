import React from 'react'
import axios from 'axios'

const LoginButton = ({
  username, password, setCurrentUsername, switchScreens,
}) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={async () => {
      try {
        await axios.post('/user/login', { username, password })
        setCurrentUsername(username)
        const navigate = switchScreens
        navigate('/gamelist', { replace: true })
      } catch (e) {
        alert('Incorrect Username/Password')
      }
    }}
  >
    Log In
  </button>
)

export default LoginButton
