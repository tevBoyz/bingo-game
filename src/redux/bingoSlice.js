import { createSlice } from '@reduxjs/toolkit';

const generateFullNumberPool = () => {
    return Array.from({ length: 75 }, (_, i) => i + 1);
};

const initialState = {
  playerCard: [],       // Will hold 5x5 bingo numbers
  calledNumbers: [],    // Numbers called so far
  currentNumber: null,  // Currently announced number
  markedNumbers: [],    // Player's marked numbers
  gameStatus: 'idle',   // idle | playing | won
  numberPool: generateFullNumberPool(), // All possible bingo numbers (1-75)
  winner: null,          // Player who won the game
};

export const bingoSlice = createSlice({
  name: 'bingo',
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStatus = 'playing';
      state.calledNumbers = [];
      state.markedNumbers = [];
    },
    setPlayerCard: (state, action) => {
      state.playerCard = action.payload;
    },
    callNumber: (state, action) => {
      const number = action.payload;
      state.currentNumber = number;
      state.calledNumbers.push(number);
    },
    markNumber: (state, action) => {
      const number = action.payload;
      if (!state.markedNumbers.includes(number)) {
        state.markedNumbers.push(number);
      }
    },
    callNextNumber: (state) => {
  const remaining = state.numberPool.filter(num => !state.calledNumbers.includes(num));
  if (remaining.length === 0) {
    state.currentNumber = null;
    state.gameStatus = 'ended';
    return;
  }
  const random = remaining[Math.floor(Math.random() * remaining.length)];
  state.currentNumber = random;
  state.calledNumbers.push(random);

  if (remaining.length === 0) {
  state.currentNumber = null;
  state.gameStatus = 'ended';
}

},
endGame: (state, action) => {
  state.gameStatus = 'ended';
  state.winner = action.payload; // "player"
},

resetGame: (state) => {
  state.playerCard = [];
  state.calledNumbers = [];
  state.currentNumber = null;
  state.markedNumbers = [];
  state.gameStatus = 'idle';
  state.winner = null;
  state.numberPool = Array.from({ length: 75 }, (_, i) => i + 1);
},


  },
});

export const { startGame, setPlayerCard, callNumber, markNumber, callNextNumber, endGame, resetGame } = bingoSlice.actions;

export default bingoSlice.reducer;
