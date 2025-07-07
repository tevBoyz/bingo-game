import { createSlice } from '@reduxjs/toolkit';

const generateFullNumberPool = () => {
    return Array.from({ length: 75 }, (_, i) => i + 1);
};

const initialState = {
  playerCard: [],       // Will hold 5x5 bingo numbers
  calledNumbers: [],    // Numbers called so far
  currentNumber: null,  // Currently announced number
  markedNumbers: [],    // Player's marked numbers
  gameStatus: 'idle',   // idle | playing
  numberPool: generateFullNumberPool(), // All possible bingo numbers (1-75)
  winner: null,          // Player who won the game
  players: [],
  roomCode: '',
  currentPlayer: '',
  isHost: false,
};

export const bingoSlice = createSlice({
  name: 'bingo',
  initialState,
  reducers: {
    setIsHost: (state, action)=> {
      state.isHost = action.payload;
    },
    setGameStatus: (state, action) =>{
      state.gameStatus = action.payload;
    },
    startGame: (state) => {
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
      console.log(state.calledNumbers);
    },
    markNumber: (state, action) => {
      const number = action.payload;
      if (!state.markedNumbers.includes(number)) {
        state.markedNumbers.push(number);
      }
    },
//     callNextNumber: (state) => {
//   const remaining = state.numberPool.filter(num => !state.calledNumbers.includes(num));
//   if (remaining.length === 0) {
//     state.currentNumber = null;
//     state.gameStatus = 'ended';
//     return;
//   }
//   const random = remaining[Math.floor(Math.random() * remaining.length)];
//   state.currentNumber = random;
//   state.calledNumbers.push(random);

//   if (remaining.length === 0) {
//   state.currentNumber = null;
//   state.gameStatus = 'ended';
// }
// },
setCurrentPlayer: (state, action) => {
  state.currentPlayer = action.payload;
},
// Add player reducer
    addPlayer: (state, action) => {
      const newPlayer = action.payload;
      // You might want to add validation or default properties here
      state.players.push(newPlayer);
    },
    // Update player reducer
    updatePlayer: (state, action) => {
      const { id, ...updatedProps } = action.payload;
      const playerIndex = state.players.findIndex(player => player.id === id);
      if (playerIndex !== -1) {
        state.players[playerIndex] = { 
          ...state.players[playerIndex], 
          ...updatedProps 
        };
      }
    },
    // Remove player reducer
    removePlayer: (state, action) => {
      const id = action.payload;
      state.players = state.players.filter(player => player.id !== id);
    },
    // Set all players at once
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setRoomCode: (state, action) => {
      state.roomCode =action.payload;

    },
endGame: (state, action) => {
  state.gameStatus = 'idle';
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

quitGame: (state) => {
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

export const { startGame, setPlayerCard, callNumber, markNumber, callNextNumber, endGame, resetGame,addPlayer,
  updatePlayer,
  removePlayer,
  setPlayers, setRoomCode, setCurrentPlayer, setIsHost, setGameStatus, quitGame} = bingoSlice.actions;

export default bingoSlice.reducer;
