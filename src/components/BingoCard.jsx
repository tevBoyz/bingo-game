import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markNumber } from '../redux/bingoSlice';
import { useRef } from 'react';


export default function BingoCard() {
  const dispatch = useDispatch();
  const card = useSelector(state => state.bingo.playerCard);
  const marked = useSelector(state => state.bingo.markedNumbers);
  const called = useSelector(state => state.bingo.calledNumbers);

    const audioRef = useRef(null)
  

  const isMarked = (num) => marked.includes(num) || num === 'FREE';

  const handleClick = (num) => {
    if (num === 'FREE') 
        return; // Free space is always marked
    const isCalled = called.includes(num);
    if (!isCalled)return;

    dispatch(markNumber(num));
    // Optionally, you can add a sound effect or visual feedback here
    if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
};

  return (
    <div className="grid grid-cols-5 gap-1 w-[300px] text-center">
      {['B', 'I', 'N', 'G', 'O'].map(letter => (
        <div key={letter} className="bg-green-400 w-full rounded-2xl text-center font-bold text-lg dark:text-white">{letter}</div>
      ))}

      {card.flat().map((num, idx) => (
        <div
          key={idx}
          className={`p-2 border dark:border-white rounded cursor-pointer dark:text-white ${
            isMarked(num) ? 'bg-green-400 text-white' : 'hover:bg-gray-100 hover:dark:bg-gray-700 dark:hover:bg-gray-600    '
          }`}
          onClick={() => handleClick(num)}
        >
          {num}
        </div>
      ))}
      <audio ref={audioRef} src="/confirm.mp3" />

    </div>
  );
}
