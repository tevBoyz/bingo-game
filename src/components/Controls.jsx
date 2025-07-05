import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../socket';


export default function Controls({showModal}) {
  const dispatch = useDispatch();
  const card = useSelector(state => state.bingo.playerCard);
  const marked = useSelector(state => state.bingo.markedNumbers);
  const roomCode = useSelector(state => state.bingo.roomCode);

  const handleBingoClick = () => {
    socket.emit('bingoClaim', ({roomCode}));
    // console.log('from Conttrols', roomCode)
  };

 
  return (
    <div>
        <button
      onClick={handleBingoClick}
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow dark:bg-green-700 dark:hover:bg-green-800"
    >
      🏆 Bingo!
    </button>
    {/* <button
      onClick={handleRestart}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow dark:bg-red-700 dark:hover:bg-red-800 ml-4"
    >
      🔁 Restart
    </button> */}
    </div>
    
  );
}
