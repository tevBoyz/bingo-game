import { useEffect,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPlayerCard,
  startGame,
  setGameStatus,
  callNumber,
  endGame,
} from './redux/bingoSlice';
import BingoCard from './components/BingoCard';
import CalledNumber from './components/CalledNumber';
import CallHistory from './components/CallHistory';
import Controls from './components/Controls';
import GameModal from './components/GameModal';
import useDarkMode from './hooks/useDarkMode';
import Lobby from './components/Lobby';

import { socket } from './socket';

export default function App() {
  const dispatch = useDispatch();
  const gameStatus = useSelector(state => state.bingo.gameStatus);
  const audioRef = useRef(null)

  const [darkMode, setDarkMode] = useDarkMode();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
    });

    socket.on("joinError", (msg) => {
      setError(msg);
    });

    socket.on('gameStarted', ({yourCard, roomCode}) =>{
      dispatch(setPlayerCard(yourCard));
      dispatch(startGame());
      dispatch(setGameStatus('playing'));

      setTimeout(()=> {
        socket.emit('callNumber', {roomCode});
      })
    })

    socket.on('numberCalled', ({number, allNumbers})=> {
      dispatch(callNumber(number))
    })

    socket.on('noMoreNumbers', ()=>{
      alert("No one one the game.")
      dispatch(endGame());
      dispatch(setGameStatus(idle));
    })

    socket.on('bingoSuccess', ({winner}) =>{
      alert("Bingo! \n" + winner.toUpperCase() + " won the game! ");
      dispatch(endGame(winner));
      console.log("winner:", winner)  
    })

    socket.on('bingoFailed', ({message}) =>{
      alert(message)
    })

    socket.on("gameStatus", (msg) => {
    console.log("Game status:", msg); // Optional: Show in UI later
  });

  return () => {
    socket.off("gameStarted");
    socket.off("gameStatus");
  };
  }, []);

const [modal, setModal] = useState({ visible: false, message: '' });
  

return (
  <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-6 dark:bg-gray-900">
    <h1 className="text-3xl font-bold dark:text-white">Bingo Game 🎯</h1>

    <audio ref={audioRef} src="/ding-sound.mp3" preload="auto" />

    {gameStatus === 'idle' && (
      <Lobby/>
    )}

    {gameStatus !== 'idle' && (
      <>
        <CalledNumber />
        <BingoCard />
        <Controls showModal={setModal} />
        <CallHistory />

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
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
</div>
  </div>
);

}
