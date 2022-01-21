/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { FC, useState, useEffect } from 'react'

import useHasher from '../../hooks/use-hasher'

// :: ---

type HashCardProps = {
  //
}

const HashCard: FC<HashCardProps> = () => {
  // :: The useHasher hook interfaces with our WASM module.
  const hasher = useHasher()

  const [input, setInput] = useState<string>()
  const [hashed, setHashed] = useState<string>('')

  useEffect(() => {
    if (!input) return
    hasher(input).then(setHashed)
  }, [input])

  return (
    <div className='hash-card p-6 rounded shadow-lg w-full min-w-fit bg-slate-50 flex flex-col gap-4'>
      <header className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>SHA-256 hash calculator</h2>
        <p className='text-sm text-slate-600'>
          This uses a WebAssembly (WASM) module to calculate the SHA-256 hash of your input text
          below.
        </p>
      </header>

      <div>
        <label>
          <textarea
            className='w-full p-2 outline-none focus:border-orange-400 border-2 text-blue-600'
            placeholder='Input your text here.'
            value={input}
            onChange={({ target }) => setInput(target.value)}
          ></textarea>
        </label>
      </div>

      <div>
        <header className='text-lg font-medium text-slate-500'>Hash</header>
        {hashed ? (
          <p className='max-w-full font-mono text-purple-500'>{hashed}</p>
        ) : (
          <p>Type some text above, and the SHA-256 hash will appear here.</p>
        )}
      </div>

      <footer></footer>
    </div>
  )
}

export default HashCard
