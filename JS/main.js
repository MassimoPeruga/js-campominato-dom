'use strict';

let score = 0;

// Funzione per generare un numero casuale in un intervallo
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Funzione per calcolare il numero di celle in base alla difficoltà
function calcCelle() {
    const difficulty = document.getElementById('mode').value;
    let celle;

    switch (difficulty) {
        case 'easy':
            celle = 100;
            break;
        case 'hard':
            celle = 49;
            break;
        case 'medium':
        default:
            celle = 81;
            break;
    }

    return celle;
}

// Funzione per generare le bombe 
const numBombs = 16; // Imposta il numero desiderato di bombe
function generateBombs(totalCells) {
    const bombs = [];
    while (bombs.length < numBombs) {
        const bomb = getRandomNumber(1, totalCells);
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs;
}

// Funzione per verificare se la cella è una bomba
function checkForBomb(cellIndex, bombs) {
    let isBomb = false;
    let i = 0;
    while (i < bombs.length && !isBomb) {
        if (bombs[i] === cellIndex) {
            isBomb = true;
        }
        i++;
    }
    return isBomb;
}

// Funzione per gestire il click sulle celle
function handleCellClick(cellElement, cellIndex, bombs) {
    const isBomb = checkForBomb(cellIndex, bombs);

    if (!isBomb && !cellElement.classList.contains('ms_flower') && !cellElement.classList.contains('ms_bomb')) {
        // Cella sicura cliccata
        cellElement.classList.add('ms_flower');
        updateScore();
    } else if (isBomb) {
        // Bomba cliccata
        cellElement.classList.add('ms_bomb');
        endGame(false);
    }
}

// Funzione per creare una cella
function createCell(difficulty, bombs, index) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('ms_cella', difficulty);
    cellElement.addEventListener('click', function () {
        handleCellClick(cellElement, index, bombs);
    });
    return cellElement;
}

// Funzione per aggiungere tutte le celle al DOM
function createCelle(grid, difficulty, bombs) {
    const totalCells = calcCelle(difficulty);
    const fragment = new DocumentFragment();
    const celleArray = [];

    for (let i = 0; i < totalCells; i++) {
        const cellElement = createCell(difficulty, bombs, i);
        fragment.appendChild(cellElement);
        celleArray.push(cellElement);
    }

    grid.appendChild(fragment);

    return celleArray;
}

// Funzione per resettare il punteggio a 0
function resetScore() {
    score = 0;
    const punteggio = document.getElementById('punteggio');
    punteggio.textContent = 'Punteggio: 0';
    punteggio.classList.remove('d-none');
}

// Funzione per nascondere il messaggio
function hideMessage() {
    const messaggio = document.getElementById('messaggio');
    if (!messaggio.classList.contains('d-none')) {
        messaggio.classList.add('d-none');
    }
}

// Funzione per rimuovere le celle esistenti
function removeExistingCells(grid) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

// Funzione per resettare il gioco
function resetGame(grid) {
    hideMessage();
    removeExistingCells(grid);
    resetScore();
}

// Funzione per aggiornare il punteggio
function updateScore() {
    score++;
    const scoreElement = document.getElementById('punteggio');
    scoreElement.textContent = 'Punteggio: ' + score;

    // Verifica se tutte le celle sicure sono state cliccate
    if (score === calcCelle() - numBombs) {
        endGame(true);
    }
}

// Funzione per terminare il gioco
function endGame(victory) {
    const messaggio = document.getElementById('messaggio');
    if (victory) {
        messaggio.textContent = 'Hai vinto!';
    } else {
        messaggio.textContent = 'Hai perso.';
    }
    messaggio.classList.remove('d-none');
}

// Funzione principale del gioco
function game() {
    const grid = document.getElementById('ms_griglia');

    // Richiamo resetGame
    resetGame(grid);

    // Calcola il numero di celle in base alla difficoltà
    const difficulty = document.getElementById('mode').value;

    // Genera bombe
    const bombs = generateBombs(calcCelle(difficulty));

    // Crea le celle
    const celleArray = createCelle(grid, difficulty, bombs);
}

// Gestione del click su play
document.getElementById('play').addEventListener('click', game);
