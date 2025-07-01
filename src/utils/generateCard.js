export function generateBingoCard() {
  const columns = {
    B: getUniqueRandomNumbers(1, 15, 5),
    I: getUniqueRandomNumbers(16, 30, 5),
    N: getUniqueRandomNumbers(31, 45, 5),
    G: getUniqueRandomNumbers(46, 60, 5),
    O: getUniqueRandomNumbers(61, 75, 5),
  };

  // Set center "free space"
  columns.N[2] = 'FREE';

  // Build 5x5 grid: each row collects from B-I-N-G-O
  const card = Array.from({ length: 5 }, (_, rowIndex) =>
    ['B', 'I', 'N', 'G', 'O'].map(col => columns[col][rowIndex])
  );

  return card;
}

function getUniqueRandomNumbers(min, max, count) {
  const nums = new Set();
  while (nums.size < count) {
    nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return [...nums];
}
