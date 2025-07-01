import React from 'react';
import { useSelector } from 'react-redux';

export default function CallHistory() {
  const calledNumbers = useSelector(state => state.bingo.calledNumbers);

  // Show last 5 called numbers, most recent first
  const recent = [...calledNumbers].slice(-5).reverse();

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {recent.map((num, idx) => (
        <span
          key={idx}
          className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-medium dark:bg-blue-600 dark:text-blue-200"
        >
          {num}
        </span>
      ))}
    </div>
  );
}
