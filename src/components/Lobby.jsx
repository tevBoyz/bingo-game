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
    <div className="p-4 flex flex-col justify-center items-center gap-4 max-w-md mx-auto dark:text-white dark:border-white">
      <div className="flex gap-5 items-end">
        <div className="flex flex-col items-center hostDiv gap-2">
          
        <input
          placeholder="Enter your name"
          value={hostPlayer}
          onChange={(e) => setHostPlayer(e.target.value)}
          className="p-2 border-b-2"
          id="hostName"
        />
        <button
          onClick={handleHost}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Host Game
        </button>
      </div>

      <div className="flex flex-col border-l-2 pl-6 items-center justify-center joinDiv gap-2">

        <input
          placeholder="Enter your name"
          value={joinPlayer}
          onChange={(e) => setJoinPlayer(e.target.value)}
          className="p-2 border-b-2"
          id="joinName"
        />

        <input
          placeholder="Room code to join"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="border-b-2 p-2"
          id="roomCodeToJoin"
        />
        <button
          onClick={handleJoin}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Join Game
        </button>
      </div>
      </div>
      
      <div className="max-w-md">
        <div className="border-b-2 pb-2 flex items-center justify-start gap-2">
          <code id="roomCodeDisp" className="text-start dark:text-white"> {"Room Code: " + roomCode}</code>
        {isHost && (
          <Copy
          className="cursor-pointer text-blue-600"
          onClick={() => navigator.clipboard.writeText(roomCode)}
        />
        )}
        </div>
        <ol id="playersDisp" className="border-r-2 flex flex-col items-start list-decimal pl-5 mt-2 ">
          <span className="w-full">Players</span>
          {players.map((player, index) => (
            <li key={index} className="py-1">
              {player.playerName || `Player ${index + 1}`}
            </li>
          ))}
        </ol>
        {(isHost && players.length >=2) && (
              <button
            onClick={handleStartGame}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded w-full"
          >
            Start Game
          </button>
            )}
            
      </div>
    </div>
  );
}

export default Lobby;
