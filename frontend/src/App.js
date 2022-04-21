import React from 'react'
import {
  Routes, Route, Outlet,
} from 'react-router-dom'

// eslint-disable-next-line no-undef
export default App = () => (
  <div>
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
