import React from 'react'
import ReactDOM from 'react-dom'

import AppRoot from './components/approot'

import './index.css'

// :: ---

ReactDOM.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
  document.querySelector('#root')
)
