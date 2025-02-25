/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { FC, useState, useEffect, ChangeEvent } from 'react';

import useHasher from '../../hooks/use-hasher';

// Constants
const TITLE = 'SHA-256 hash calculator';
const DESCRIPTION = 'This uses a WebAssembly (WASM) module to calculate the SHA-256 hash of your input text below.';
const PLACEHOLDER = 'Input your text here.';
const EMPTY_STATE_MESSAGE = 'Type some text above, and the SHA-256 hash will appear here.';

// Component types
type HashCardProps = {
  className?: string;
  initialInput?: string;
};

const HashCard: FC<HashCardProps> = ({ className = '', initialInput = '' }) => {
  // :: The useHasher hook interfaces with our WASM module.
  const hasher = useHasher();

  const [input, setInput] = useState<string>(initialInput);
  const [hashed, setHashed] = useState<string>('');

  // Handle input changes
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  // Calculate hash when input changes
  useEffect(() => {
    const calculateHash = async () => {
      if (!input) {
        setHashed('');
        return;
      }
      
      try {
        const hash = await hasher(input);
        setHashed(hash);
      } catch (error) {
        console.error('Error calculating hash:', error);
        setHashed('Error calculating hash');
      }
    };

    calculateHash();
  }, [input, hasher]);

  return (
    <div className={`hash-card p-6 rounded shadow-lg w-full min-w-fit bg-slate-50 flex flex-col gap-4 ${className}`}>
      <header className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>{TITLE}</h2>
        <p className='text-sm text-slate-600'>{DESCRIPTION}</p>
      </header>

      <div>
        <label htmlFor="hash-input" className="sr-only">Input text to hash</label>
        <textarea
          id="hash-input"
          className='w-full p-2 outline-none focus:border-orange-400 border-2 text-blue-600'
          placeholder={PLACEHOLDER}
          value={input}
          onChange={handleInputChange}
        />
      </div>

      <HashResult hash={hashed} />
    </div>
  );
};

// Extracted sub-component for the hash result display
type HashResultProps = {
  hash: string;
};

const HashResult: FC<HashResultProps> = ({ hash }) => (
  <div>
    <header className='text-lg font-medium text-slate-500'>Hash</header>
    {hash ? (
      <p className='max-w-full font-mono text-purple-500 break-all'>{hash}</p>
    ) : (
      <p>{EMPTY_STATE_MESSAGE}</p>
    )}
  </div>
);

export default HashCard;
