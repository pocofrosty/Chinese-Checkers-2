import React from 'react'
import {
  Routes, Route, Outlet, 
} from 'react-router-dom'
import axios from 'axios'

// eslint-disable-next-line no-undef
export default App = () => {
  const text = "test"
  return (
    <div>
      <button onClick={() => {
        window.location.href = 'http://localhost:3000/auth/google'
      }}
      >
        Sign In with google
      </button>
      <Routes path="/" element={<Layout />}>
        <Route path="temp" element={<ValidPage text={text}/>} />
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

const ValidPage = ({text}) => (
  <div>
    <h1> {`Username: ${text}`} </h1>
  </div>
)
