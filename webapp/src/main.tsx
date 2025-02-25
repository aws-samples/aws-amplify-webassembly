/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import React from 'react'
import { createRoot } from 'react-dom/client'

import AppRoot from './components/approot'

import './index.css'

// :: ---

// Get the root element
const rootElement = document.querySelector('#root')

// Ensure the element exists
if (!rootElement) {
  throw new Error('Root element not found')
}

// Create a root using the new React 18 API
const root = createRoot(rootElement)

// Render the app
root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
)
