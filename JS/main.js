'use strict';

// Reset del gioco
function resetGame(grid) {
    // Pulisci la console
    console.clear();

    // Nascondi il messaggio visualizzato se presente
    const messaggio = document.getElementById('messaggio');
    if (!messaggio.classList.contains('d-none')) {
        messaggio.classList.add('d-none');
    }
    // Rimuovi tutte le celle esistenti
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

// Funzione per la creazione delle celle
function createElement(tag, classes, content) {
    function addClasses(element, classes) {
        for (let i = 0; i < classes.length; i++) {
            element.classList.add(classes[i]);
        }
    }
    const element = document.createElement(tag);
    addClasses(element, classes);
    element.textContent = content;
    return element;
}

// Funzione per associare il numero di righe e colonne alla difficoltà
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

// Funzione per aggiungere le celle al DOM
function createCelle(grid, celle) {
    const difficulty = document.getElementById('mode').value;
    const fragment = new DocumentFragment();
    for (let i = 1; i <= celle; i++) {
        const cellElement = createElement('div', ['ms_cella', difficulty], i);
        cellElement.addEventListener('click', function () {
            cellElement.classList.add('ms_clicked');
            console.log("Ho cliccato su:", i);
        });
        fragment.appendChild(cellElement);
    }
    grid.appendChild(fragment);
}

// Funzione principale del gioco
function game() {
    const grid = document.getElementById('ms_griglia');

    // Richiamo resetGame
    resetGame(grid);

    // Calcola il numero di celle in base alla difficoltà
    const celle = calcCelle();

    // Crea le celle
    createCelle(grid, celle);
}

// Gestione del click su play
document.getElementById('play').addEventListener('click', game);
