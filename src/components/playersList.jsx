import React from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../socket';

export default function PlayerList() {
  const players = useSelector(state => state.bingo.players);
  const isHost = useSelector(state => state.bingo.isHost);

  if (!players || players.length === 0) return null;

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        👥 Players in Room
      </h2>
      <ul className="space-y-2">
        {players.map((player, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-white"
          >
            <span>{player.playerName } </span>
            {
                player.id === socket.id ? (
                    <span className='text-yellow-300'>You</span>
                ) : ""
            }
            {/* {player.isHost && (
              <span className="text-xs px-2 py-1 rounded bg-yellow-400 text-black font-semibold">
                Host
              </span>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
}
