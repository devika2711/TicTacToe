const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
  const cell = e.target;
  const currentSymbol = currentPlayer;

  if (!gameActive || cell.textContent !== '') {
    return;
  }

  cell.textContent = currentSymbol;
  cell.classList.add(currentSymbol);

  if (checkWin()) {
    announceWinner();
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    announceDraw();
    gameActive = false;
    return;
  }

  changePlayer();
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return cells[a].textContent !== '' && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}

function announceWinner() {
  const message = `Player ${currentPlayer} wins!`;
  alert(message);
}

function checkDraw() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function announceDraw() {
  const message = "It's a draw!";
  alert(message);
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });

  currentPlayer = 'X';
  gameActive = true;
}
