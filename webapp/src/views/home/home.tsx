import { FC } from 'react'

import HashCard from '../../components/hash-card'

// :: ---

type HomeViewProps = {
  //
}

const HomeView: FC<HomeViewProps> = () => {
  return (
    <section className='w-screen h-screen flex flex-col justify-center items-center gap-8'>
      <header className='text-center text-white flex flex-col gap-4'>
        <h1 className='text-3xl font-light'>Sample React + (Rust) WebAssembly</h1>
        <p className='text-lg font-thin text-slate-100'>
          This webapp demonstrates how to set up an automated CI build pipeline
          <br />
          on AWS Amplify for a webapp with a WASM compilation component.
        </p>
      </header>

      <div>
        <HashCard />
      </div>

      <footer className='text-white text-sm font-light'>
        &copy; Amazon.com, Inc. or its affiliates. Code is shared under the MIT-0 license.
      </footer>
    </section>
  )
}

export default HomeView
