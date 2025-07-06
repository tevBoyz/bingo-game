import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { Copy } from "lucide-react";

import {
  setPlayers,
  setCurrentPlayer,
  setRoomCode,
  setIsHost,
  setGameStatus,
} from '../redux/bingoSlice';
import { useDispatch } from "react-redux";

function Lobby({}) {
  const dispatch = useDispatch();
  const [room, setRoom] = useState('');
  const [hostPlayer, setHostPlayer] = useState('');
  const [joinPlayer, setJoinPlayer] = useState('');

  const roomCode = useSelector((state) => state.bingo.roomCode);
  const players = useSelector((state) => state.bingo.players);
  const isHost = useSelector((state) => state.bingo.isHost);

  const handleHost = () => {
    if(hostPlayer === ''){
      alert('Enter Your Name');
      document.getElementById('hostName').focus();
    }
    else{
      dispatch(setCurrentPlayer(hostPlayer));
      dispatch(setIsHost(true));
      socket.emit("host", { name: hostPlayer });
    }
  };

  const handleJoin = () => {
    if(joinPlayer === "")
    {
      alert('Enter Your Name');
      document.getElementById('joinName').focus();
    }
    else if(room === ''){
      alert('Enter Room Code to Join');
      document.getElementById('roomCodeToJoin').focus();
    }
    else{
    socket.emit("joinRoom", { player: joinPlayer, room });
    }
  };

  const handleStartGame = () => {
    dispatch(setGameStatus('playing'));
    socket.emit('startGame', {roomCode})
    console.log("staring game")
  }

  useEffect(()=> {
    socket.on("roomCreated", ({ room, players }) => {
        dispatch(setRoomCode(room));
        dispatch(setPlayers(players));

      console.log("room creted", room)

      });
  
    socket.on("playerJoined", ({room, players }) => {
        dispatch(setRoomCode(room));
        dispatch(setPlayers(players));

      });

      return () =>{
        socket.off('roomCreated');
        socket.off('playerJoined');
      };
  }, [dispatch]);

  return (
  <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto flex flex-col gap-6 text-gray-900 dark:text-white">
    {/* Host & Join Section */}
    <div className="flex flex-col md:flex-row gap-6 justify-between">
      {/* Host Box */}
      <div className="flex-1 bg-white dark:bg-gray-800 shadow rounded-xl p-5 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Host a Game</h2>
        <input
          placeholder="Enter your name"
          value={hostPlayer}
          onChange={(e) => setHostPlayer(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          id="hostName"
        />
        <button
          onClick={handleHost}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow text-center transition"
        >
          Host Game
        </button>
      </div>

      {/* Join Box */}
      <div className="flex-1 bg-white dark:bg-gray-800 shadow rounded-xl p-5 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Join a Game</h2>
        <input
          placeholder="Enter your name"
          value={joinPlayer}
          onChange={(e) => setJoinPlayer(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
          id="joinName"
        />
        <input
          placeholder="Room code"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
          id="roomCodeToJoin"
        />
        <button
          onClick={handleJoin}
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow text-center transition"
        >
          Join Game
        </button>
      </div>
    </div>

    {/* Room Info & Players */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 flex flex-col gap-4">
      {/* Room Code */}
      <div className="flex items-center justify-between border-b pb-2">
        <span className="text-sm font-medium">Room Code:</span>
        <div className="flex items-center gap-2">
          <code id="roomCodeDisp" className="text-sm">{roomCode || 'N/A'}</code>
          {isHost && (
            <Copy
              className="w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-700"
              onClick={() => navigator.clipboard.writeText(roomCode)}
            />
          )}
        </div>
      </div>

      {/* Players List */}
      <div>
        <h3 className="text-md font-semibold mb-2">Players:</h3>
        <ol
          id="playersDisp"
          className="list-decimal pl-5 text-sm space-y-1"
        >
          {players.map((player, index) => (
            <li key={index}>
              {player.playerName || `Player ${index + 1}`}
            </li>
          ))}
        </ol>
      </div>

      {/* Start Game Button */}
      {isHost && players.length >= 2 && (
        <button
          onClick={handleStartGame}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded w-full transition"
        >
          Start Game
        </button>
      )}
    </div>
  </div>
);

}

export default Lobby;
