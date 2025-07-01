export function checkBingoWin(card, marked) {
  const isMarked = (num) => num === 'FREE' || marked.includes(num);

  // Check rows
  for (let row of card) {
    if (row.every(num => isMarked(num))) return true;
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    const column = card.map(row => row[col]);
    if (column.every(num => isMarked(num))) return true;
  }

  // Check diagonals
  const mainDiagonal = [0, 1, 2, 3, 4].map(i => card[i][i]);
  const antiDiagonal = [0, 1, 2, 3, 4].map(i => card[i][4 - i]);

  if (mainDiagonal.every(num => isMarked(num))) return true;
  if (antiDiagonal.every(num => isMarked(num))) return true;

  return false;
}
