import React, { useEffect,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateBingoCard } from './utils/generateCard';
import {
  setPlayerCard,
  startGame,
  callNextNumber,
  resetGame,
} from './redux/bingoSlice';
import BingoCard from './components/BingoCard';
import CalledNumber from './components/CalledNumber';
import CallHistory from './components/CallHistory';
import Controls from './components/Controls';
import GameModal from './components/GameModal';
import useDarkMode from './hooks/useDarkMode';


export default function App() {
  const dispatch = useDispatch();
  const gameStatus = useSelector(state => state.bingo.gameStatus);
  const audioRef = useRef(null)
  const winner = useSelector(state => state.bingo.winner);

  const [darkMode, setDarkMode] = useDarkMode();

const startNewGame = () => {
  const card = generateBingoCard();
  dispatch(resetGame()); // just to be clean
  dispatch(setPlayerCard(card));
  dispatch(startGame());
};


  const [modal, setModal] = useState({ visible: false, message: '' });

  // Generate card on mount
  // useEffect(() => {
  //   const card = generateBingoCard();
  //   dispatch(setPlayerCard(card));
  //   dispatch(startGame());
  // }, [dispatch]);

  // Call a new number every 5 seconds
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const interval = setInterval(() => {
      dispatch(callNextNumber());
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [dispatch, gameStatus]);

  {winner && 
    <div className="bg-green-100 text-green-800 px-6 py-3 rounded shadow">
    🎉 {winner.toUpperCase()} wins the game!
  </div>
}

return (
  <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-6 dark:bg-gray-900">
    <h1 className="text-3xl font-bold dark:text-white mb-10">🎯 Bingo Game</h1>

    <audio ref={audioRef} src="/ding-sound.mp3" preload="auto" />

    {gameStatus === 'idle' && (
      <button
        onClick={startNewGame}
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition duration-300 flex items-center gap-2"
      >
        ▶️ Start Game
      </button>
    )}

    {gameStatus !== 'idle' && (
      <>
        <CalledNumber />
        <CallHistory />
        <BingoCard />
        <Controls showModal={setModal} />
      </>
    )}

    <GameModal
      visible={modal.visible}
      message={modal.message}
      onClose={() => setModal({ visible: false, message: '' })}
    />

    <div className="absolute top-4 right-4">
    <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
</div>
  </div>
);

}
