import React from 'react';

export default function InfoPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-lg w-[90%] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500  text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🎯 How to Play Bingo</h2>

        <p className="text-gray-700 dark:text-gray-200 mb-2">
          Welcome to the Bingo Game! This is a real-time multiplayer Bingo experience where one player hosts the game and others can join using a room code.
        </p>

        <ul className="list-disc list-none list-inside text-gray-700 dark:text-gray-200 space-y-1 mb-4">
          <li>🔸 Click <strong>Host Game</strong> after entering your name to create a room and share the code.</li>
          <li>🔸 Click <strong>Join Room</strong> to enter your name and join with the code.</li>
          <li>🔸 Once at least 2 players are in, the host can start the game.</li>
          <li>🔸 Mark numbers on your card as they’re called out.</li>
          <li>🔸 Call Bingo if you think you won!</li>
        </ul>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Built with React, Redux Toolkit, Socket.IO, and TailwindCSS. Enjoy the game!
        </p>
        <p></p>
      </div>
    </div>
  );
}
