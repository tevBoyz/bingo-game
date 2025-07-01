import React from 'react';
import { useSelector } from 'react-redux';

export default function CalledNumber() {
  const current = useSelector(state => state.bingo.currentNumber);
  const status = useSelector(state => state.bingo.gameStatus);

  if (status === 'idle') return null;

  if (status === 'ended') {
    return (
      <div className="text-3xl font-bold text-red-600 dark:text-red-400">
        ❌ Game Over
      </div>
    );
  }

  if (current === null) {
    return (
      <div className="text-3xl text-gray-600 dark:text-gray-300">
        ⏳ Waiting for next number...
      </div>
    );
  }

  return (
    <div className="text-center text-2xl font-extrabold text-gray-700 dark:text-gray-300">
      Current Number <br/> <span className='text-5xl m-12 text-green-400 dark:text-green-700'>{current}</span>
    </div>
  );
}
