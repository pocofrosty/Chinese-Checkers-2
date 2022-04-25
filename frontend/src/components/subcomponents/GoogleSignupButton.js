import React from 'react'
import axios from 'axios'

const GoogleSignUpButton = () => (
  <button
    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={async () => {
      try {
        window.location.href = 'http://localhost:3000/auth/google'
      } catch (e) {
        alert('Incorrect Username/Password')
      }
    }}
  >
    Sign Up with Google
  </button>
)

export default GoogleSignUpButton
