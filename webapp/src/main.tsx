/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
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
