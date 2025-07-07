import { useEffect,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPlayerCard,
  startGame,
  setGameStatus,
  callNumber,
  endGame,
  setPlayers,
  quitGame,
  setRoomCode,
} from './redux/bingoSlice';
import BingoCard from './components/BingoCard';
import CalledNumber from './components/CalledNumber';
import CallHistory from './components/CallHistory';
import Controls from './components/Controls';
import GameModal from './components/GameModal';
import useDarkMode from './hooks/useDarkMode';
import Lobby from './components/Lobby';
import PlayersList from './components/playersList'
import CustomPopup from './components/CustomPopup';
import InfoPopup from "./components/InfoPopup";


import { socket } from './socket';

export default function App() {
  const dispatch = useDispatch();
  const gameStatus = useSelector(state => state.bingo.gameStatus);
  const players= useSelector(state => state.bingo.players);
  const audioRef = useRef(null)
  const [popup, setPopup] = useState({ visible: false, title: '', message: '', imageUrl: '' });
  const [showInfo, setShowInfo] = useState(false);


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

    socket.on('gameRestarted', ({yourCard, roomCode}) =>{
      dispatch(setPlayerCard(yourCard));
      dispatch(startGame());
      dispatch(setGameStatus('playing'));

      setTimeout(()=> {
        socket.emit('callNumber', {roomCode});
      })
    })

    socket.on('numberCalled', ({number, allNumbers})=> {
        dispatch(callNumber(number))

      if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind in case it's still playing
      audioRef.current.play().catch(err => {
      console.warn("Sound couldn't play:", err);
    });
  }
      
    });

    socket.on('noMoreNumbers', (message)=>{
      // alert("No one one the game.")
      setPopup({
        visible: true,
        title: "Bingo!",
        message: message,
        imageUrl: "/danger.png",
      });
      dispatch(endGame());
      dispatch(setGameStatus(idle));
    })

    socket.on('bingoSuccess', ({winner}) =>{
      //alert("Bingo! \n" + winner.toUpperCase() + " won the game! ");
      setPopup({
        visible: true,
        title: "Bingo!",
        message: winner.toUpperCase() + " has won the game! ",
        imageUrl: "/congrats.png",
      });
      dispatch(endGame(winner));
      console.log("winner:", winner)  
    })

    socket.on('bingoFailed', ({message}) =>{
      // alert(message)
      setPopup({
        visible: true,
        title: "Bingo!",
        message: message,
        imageUrl: "/danger.png",
      });
    })

    socket.on('playerLeft', ({playerName, players})=>{
      console.log('playerLeft',players.length, playerName)
      if(players.length < 2){
        setPopup({
        visible: true,
        title: "Bingo game!",
        message: playerName.toUpperCase() + " has left the game. \n" + "Game ended, Players count is less than minimum.",
        imageUrl: "./public/danger.png",
      });

        dispatch(quitGame());
        dispatch(endGame());
        dispatch(setGameStatus('idle'));
        dispatch(setRoomCode(''));
        dispatch(setPlayers([]))
        console.log("End game since players count is less than 2");
      }
      else if(players.length >= 2){
        setPopup({
        visible: true,
        title: "Bingo game!",
        message: playerName.toUpperCase() + " has left the game. \n",
        imageUrl: "./public/danger.png",
      });
      dispatch(setPlayers(players))

      }
    
      
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
    <h1 className="text-3xl font-bold dark:text-white">Bingo!</h1>

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
        <PlayersList/>

      </>
    )}

    <GameModal
      visible={modal.visible}
      message={modal.message}
      onClose={() => setModal({ visible: false, message: '' })}
    />

    <div className="absolute top-4 left-4 z-50">
      <button
        onClick={() => setShowInfo(true)}
        className="px-3 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white font-semibold hover:bg-yellow-400"
      >
        ℹ️
      </button>
    </div>

    <div className="absolute top-4 right-4">
    <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
    {popup.visible && (
      <CustomPopup
        title={popup.title}
        message={popup.message}
        imageUrl={popup.imageUrl}
        onClose={() => setPopup({ ...popup, visible: false })}
      />
    )}

    {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}

      <footer className="w-full text-center py-4 text-sm text-gray-500 dark:text-gray-400">
  © 2025 Dawit Tefera. All rights reserved.
</footer>
  </div>
);

}
