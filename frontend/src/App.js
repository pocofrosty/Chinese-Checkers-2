import React from 'react'
import {
  Routes, Route, Outlet,
} from 'react-router-dom'
import axios from 'axios'

// eslint-disable-nWext-line no-undef
export default App = () => (
  <div>
    <button onClick={() => {
      axios.get('/account/')
    }}
    >
      {' '}
      Sign In with google
      {' '}

    </button>
    <Routes path="/" element={<Layout />}>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </div>
)

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
