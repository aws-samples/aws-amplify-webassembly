import { FC } from 'react'

// :: ---

type HashCardProps = {
  //
}

const HashCard: FC<HashCardProps> = () => {
  return (
    <div className='hash-card p-6 rounded shadow-lg w-1/3 bg-slate-50 flex flex-col gap-4'>
      <header className='flex flex-col gap-2 w-2/3'>
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
          ></textarea>
        </label>
      </div>

      <div>
        <header className='text-lg font-medium text-slate-500'>Hash</header>
        <p>blah blah blah blah</p>
      </div>

      <footer></footer>
    </div>
  )
}

export default HashCard
