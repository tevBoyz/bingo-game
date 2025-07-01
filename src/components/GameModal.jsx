import React from 'react';

export default function GameModal({ visible, message, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:bg-gray-900">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80 dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4 dark:text-white">🎉 Bingo Game</h2>
        <p className="text-lg mb-6 dark:text-white">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded dark:bg-blue-500 dark:hover:bg-blue-600 shadow"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
