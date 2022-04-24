import React, { useEffect, useState } from 'react'
import {
  Routes, Route, Outlet,
} from 'react-router-dom'
import axios from 'axios'

// eslint-disable-next-line no-undef
export default App = () => {
  const [text, setText] = useState('')

  // eslint-disable-next-line no-undef
  getCurrentUser = async () => {
    const res = await axios.get('/auth/session')
    setText(res)
    return res
  }

  useEffect(() => {
    getCurrentUser().then(res => {setText(res.data.passport.user)})
  }, [])

  return (
    <div>
      <button onClick={() => {
        window.location.href = 'http://localhost:3000/auth/google'
      }}
      >
        Sign In with google
      </button>
      <button onClick={async () => {
        console.log(await axios.get('/auth/session'))
      }}
      >
        Current User
      </button>
      <Routes path="/" element={<Layout />}>
        <Route path="temp" element={<ValidPage text={text} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

const Layout = () => (
  <div>
    <Outlet />
  </div>
)

const ErrorPage = () => (
  <div>
    <h1> Invalid Site </h1>
  </div>
)

const ValidPage = ({ text }) => (
  <div>
    <h1>
      {' '}
      {`Username: ${text}`}
      {' '}
    </h1>
  </div>
)
