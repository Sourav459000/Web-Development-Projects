let isAI = false;
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function startGame(withAI) {
    isAI = withAI;
    document.getElementById('playWithFriendBtn').disabled = true;
    document.getElementById('playWithAIBtn').disabled = true;

    createBoard();
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => cellClick(i));
        gameBoard.appendChild(cell);
    }

    resetWinnerDisplay();
    createResetButton();
}

function cellClick(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        updateBoard();
        checkWinner();

        if (isAI && gameActive) {
            setTimeout(() => makeAIMove(), 500);
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            highlightWinner(pattern);
            gameActive = false;
            updateWinnerDisplay(currentPlayer);
            return; 
        }
    }

    if (!board.includes('') && gameActive) {
        updateWinnerDisplay();
        gameActive = false;
    }
}

function highlightWinner(pattern) {
    for (const index of pattern) {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add('winner');
    }
}

function makeAIMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const bestMove = findBestMove();
        board[bestMove] = currentPlayer;
        updateBoard();
        checkWinner();
    }
}

function findBestMove() {
    return board.findIndex(cell => cell === '');
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        resetGame();
    } else if (event.key >= '1' && event.key <= '9') {
        const index = parseInt(event.key) - 1;
        cellClick(index);
    }
});

function createResetButton() {
    const resetBtnContainer = document.getElementById('resetBtnContainer');
    resetBtnContainer.innerHTML = '';

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Game';
    resetBtn.addEventListener('click', resetGame);

    resetBtnContainer.appendChild(resetBtn);
}

function resetGame() {
    document.getElementById('playWithFriendBtn').disabled = false;
    document.getElementById('playWithAIBtn').disabled = false;
    isAI = false;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    createBoard();
}

function updateWinnerDisplay(winner) {
    const winnerDisplay = document.getElementById('winnerDisplay');
    winnerDisplay.textContent = winner ? `Player ${winner === 'X' ? 'O' : 'X'} wins!` : "It's a draw!";
}
function resetWinnerDisplay() {
    const winnerDisplay = document.getElementById('winnerDisplay');
    winnerDisplay.textContent = '';
}

function highlightWinner(pattern) {
    for (const index of pattern) {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add('winner');
    }

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.classList.add('game-over');
}
