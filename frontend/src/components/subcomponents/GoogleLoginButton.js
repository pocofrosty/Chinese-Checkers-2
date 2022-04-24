import React from 'react'
import axios from 'axios'

const GoogleLoginButton = ({
  username, setCurrentUsername, switchScreens,
}) => (
  <button
    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={async () => {
      try {
        window.location.href = 'http://localhost:3000/auth/google'
        setCurrentUsername(username)
        const navigate = switchScreens
        navigate('/', { replace: true })
      } catch (e) {
        console.log(e)
        alert('Error Occured')
      }
    }}
  >
    Log In With Google
  </button>
)

export default GoogleLoginButton
