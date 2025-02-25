/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { FC, ReactNode } from 'react';

import HashCard from '../../components/hash-card';

// :: ---

// Constants for reusable text
const TITLE = 'Sample React + (Rust) WebAssembly';
const DESCRIPTION = 'This webapp demonstrates how to set up an automated CI build pipeline on AWS Amplify for a webapp with a WASM compilation component.';
const COPYRIGHT = '© Amazon.com, Inc. or its affiliates. Code is shared under the MIT-0 license.';

// Sub-component for the header section
const Header: FC = () => (
  <header className='text-center text-white flex flex-col gap-4'>
    <h1 className='text-3xl font-light'>{TITLE}</h1>
    <p className='text-lg font-thin text-slate-100'>
      {DESCRIPTION}
    </p>
  </header>
);

// Sub-component for the footer section
const Footer: FC = () => (
  <footer className='text-white text-sm font-light'>
    {COPYRIGHT}
  </footer>
);

// Improved props type definition
type HomeViewProps = {
  children?: ReactNode;
  className?: string;
};

const HomeView: FC<HomeViewProps> = ({ children, className = '' }) => {
  return (
    <main className={`w-screen h-screen flex flex-col justify-center items-center gap-8 ${className}`}>
      <Header />
      
      <div>
        {children || <HashCard />}
      </div>
      
      <Footer />
    </main>
  );
};

export default HomeView;
