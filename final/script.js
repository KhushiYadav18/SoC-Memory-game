document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const timerElement = document.getElementById('timer');
    const movesElement = document.getElementById('moves');

    const emojis = ['😀', '😂', '🥰', '😎', '🤩', '😜', '🤓', '😇'];
    let gameTiles = [];
    let flippedTiles = [];
    let matchedTiles = [];
    let timer;
    let time = 0;
    let moves = 0;

    // Load sound effects
    const clickSound = new Audio('./audio/click.wav'); 
    const matchSound = new Audio('./audio/match.wav');  

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function startGame() {
        resetGame();
        gameTiles = shuffle([...emojis, ...emojis]);
        gameBoard.innerHTML = '';
        timerElement.textContent = `Time: 0:00`;
        movesElement.textContent = `Moves: 0`;

        gameTiles.forEach((emoji, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.index = index;
            tile.dataset.emoji = emoji;
            tile.addEventListener('click', () => flipTile(tile));
            gameBoard.appendChild(tile);
        });

        startTimer();
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            time++;
            timerElement.textContent = `Time: ${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
        }, 1000);
    }

    function stopGame() {
        clearInterval(timer);
        gameBoard.innerHTML = '';
        resetGame();
        timerElement.textContent = `Time: 0:00`;
        movesElement.textContent = `Moves: 0`;
    }

    function resetGame() {
        clearInterval(timer);
        time = 0;
        moves = 0;
        flippedTiles = [];
        matchedTiles = [];
    }

    function flipTile(tile) {
        if (flippedTiles.length < 2 && !tile.classList.contains('flipped') && !matchedTiles.includes(tile)) {
            tile.classList.add('flipped');
            tile.textContent = tile.dataset.emoji;
            flippedTiles.push(tile);

            // Play click sound
            clickSound.play();

            if (flippedTiles.length === 2) {
                moves++;
                movesElement.textContent = `Moves: ${moves}`;
                checkMatch();
            }
        }
    }

    function checkMatch() {
        const [tile1, tile2] = flippedTiles;
        if (tile1.dataset.emoji === tile2.dataset.emoji) {
            matchedTiles.push(tile1, tile2);
            flippedTiles = [];

            // Play match sound
            matchSound.play();

            if (matchedTiles.length === gameTiles.length) {
                setTimeout(displayWinningMessage, 500);
            }
        } else {
            setTimeout(() => {
                tile1.classList.remove('flipped');
                tile2.classList.remove('flipped');
                tile1.textContent = '';
                tile2.textContent = '';
                flippedTiles = [];
            }, 1000);
        }
    }

    function displayWinningMessage() {
        alert(`You won! Time: ${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}, Moves: ${moves}`);
    }

    startButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);
});
