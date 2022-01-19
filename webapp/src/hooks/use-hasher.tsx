import { useCallback } from 'react'

// :: These imports are available in the build context through npm link / yarn link.
//    Refer to the Makefile in this repository to see how this is achieved.
import init, { sha256 } from '@wasm-amplify-build/wasm'

// :: ?url is required so that the bundler doesn't attempt to mangle the WASM binary contents.
import wasm from '@wasm-amplify-build/wasm/wasm_bg.wasm?url'

// :: ---

const __compiled = init(wasm)

const useHasher = () => {
  const hasher = useCallback(
    async (input) => {
      await __compiled
      return sha256(input)
    },
    [__compiled]
  )

  return hasher
}

export default useHasher
