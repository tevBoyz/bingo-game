import { useSelector } from 'react-redux';

export default function CalledNumber() {
  const current = useSelector(state => state.bingo.currentNumber);
  const status = useSelector(state => state.bingo.gameStatus);

  const toShow = getText(current);

  if (status === 'idle') return null;

  if (status === 'ended') {
    return (
      <div className="text-3xl font-bold text-red-600 dark:text-red-400">
        ❌ Game Over
      </div>
    );
  }

  if (current === null) {
    return (
      <div className="text-3xl text-gray-600 dark:text-gray-300">
        ⏳ Starting...
      </div>
    );
  }

  function getText(n){
    let text = '';
    if(n >= 1 && n <= 15){
      text = "B - " + n;
    }
    else if(n > 15 && n <= 30){
      text = "I - " + n;
    }
    else if(n > 30 && n <= 45){
      text = "N - " + n;
    }
    else if(n > 45 && n <= 60){
      text = "G - " + n;
    }
    else if(n > 60 && n <= 75){
      text = "O - " + n;
    }
    return text;
  }

  return (
    <div className="border p-2 rounded-2xl text-center text-2xl font-extrabold text-gray-700 dark:text-gray-300">
      Current Call <br/> <span className='text-5xl m-12 text-green-400 dark:text-green-700'>{toShow}</span>
    </div>
  );
}
