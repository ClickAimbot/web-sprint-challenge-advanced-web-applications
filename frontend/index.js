// 👉 DO NOT CHANGE THIS FILE 👈
// 👉 DO NOT CHANGE THIS FILE 👈
// 👉 DO NOT CHANGE THIS FILE 👈
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './styles/reset.css'
import './styles/styles.css'

const root = createRoot(document.getElementById('root'))

root.render(
  <Router>
    <App />
  </Router>
)
