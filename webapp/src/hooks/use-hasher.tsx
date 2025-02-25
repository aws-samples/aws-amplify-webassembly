/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { useCallback, useEffect, useState } from 'react'

// :: These imports are available in the build context through npm link / yarn link.
//    Refer to the Makefile in this repository to see how this is achieved.
import init, { sha256 } from '@wasm-amplify-build/wasm'

// :: ?url is required so that the bundler doesn't attempt to mangle the WASM binary contents.
import wasm from '@wasm-amplify-build/wasm/wasm_bg.wasm?url'

// :: ---

// Initialize the WASM module once, outside the component
const wasmInitPromise = init(wasm)

/**
 * A hook that provides SHA-256 hashing functionality using WebAssembly
 * @returns A function that takes a string input and returns a promise resolving to the SHA-256 hash
 */
const useHasher = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  // Ensure WASM is initialized
  useEffect(() => {
    wasmInitPromise
      .then(() => setIsInitialized(true))
      .catch(error => console.error('Failed to initialize WASM module:', error))
  }, [])

  // Create the hasher function
  const hasher = useCallback(
    async (input: string): Promise<string> => {
      if (!isInitialized) {
        await wasmInitPromise
      }
      return sha256(input)
    },
    [isInitialized]
  )

  return hasher
}

export default useHasher
