import { useSelector } from 'react-redux';

export default function CallHistory() {
  const calledNumbers = useSelector(state => state.bingo.calledNumbers);

  // Show last 5 called numbers, most recent first
  const uniqueArray = [...new Set(calledNumbers)];

  const recent = [...uniqueArray].reverse();


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
    <div className="mt-4">
        <span className="font-bold dark:text-white">History: </span>
        <div className="rounded flex gap-1 flex-wrap max-w-2xs max-h-15 justify-center overflow-y-scroll [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      {recent.map((num, idx) => (
        <span
          key={idx}
          className="bg-blue-200 text-blue-800 px-3 py-1 max-h-8 min-w-5 rounded text-sm font-medium dark:bg-blue-600 dark:text-blue-200"
        >
          {getText(num)}
        </span>
      ))}
    </div>
    </div>
  );
}
