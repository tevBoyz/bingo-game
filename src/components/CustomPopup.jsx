import React from 'react';

export default function CustomPopup({ title, message, imageUrl, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20 px-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-xs sm:max-w-sm md:max-w-md p-5 sm:p-6 rounded-2xl shadow-xl text-center relative">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Popup Visual"
            className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
          />
        )}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
