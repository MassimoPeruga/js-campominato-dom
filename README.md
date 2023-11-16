# Prato Fiorito

L'obiettivo del gioco è cliccare su tutte le celle sicure senza colpire le bombe. Man mano che clicchi sulle celle sicure, il punteggio aumenta. Se colpisci una bomba, il gioco termina con la sconfitta del giocatore. Quando clicchi su tutte le celle sicure senza colpire le bombe, il gioco termina con la vittoria del giocatore.

Il programma è stato sviluppato suddiviso in funzioni, ognuna dedicata ad operazioni specifiche:

**`game()`**: Funzione principale del gioco che viene richiamata al click sul pulsante play:
1. Ottiene la griglia del campo minato,

2. Richiama **`resetGame(grid)`** che:
    - Richiama: **`resetScore()`** che azzera il punteggio a 0 e lo mostra a schermo,
    - Richiama: **`hideMessage()`** che nasconde il messaggio visualizzato,
    - Richiama: **`removeExistingCells(grid)`** che rimuove tutte le celle presenti nel campo minato. 

3. Richiama **`calcCelle()`** che ottiene la difficoltà selezionata e restituisce il numero totale di celle in base ad essa.

4. Richiama **`generateBombs(totalCells)`** che: 
    - Definisce un array di bombe,
    - Inizia un ciclo `while` che si ripete fin quando la lunghezza degli elementi contenuti nell'array è inferiore al numero di bombe impostato. Ad ogni iterazione del ciclo:
        1. Viene richiamata **`getRandomNumber(min, max)`** che restituisce un numero casuale compreso tra `min` e `max`, in questo caso 1 e il numero delle celle definito dalla funzione **`calcCelle()`**,
        2. `Se` il numero generato non è presente nell'array di bombe viene pushato in quest'ultimo.
    - Restitutisce l'array di bombe.

5. Richiama **`createCelle(grid, difficulty, bombs)`** che:
    - Ottiene il numero totale di celle **`calcCelle()`** che restituisce il numero in base alla difficoltà selezionata,
    - Crea un frammento,
    - Definisce un array di celle,
    - Inizia un ciclo for che si ripete per il numero totale di celle, ad ogni iterazione del ciclo:
        1. Richiama **`createCell(difficulty, bombs, index)`** che crea una cella e aggiunge un `eventListener` che richiama **`handleCellClick(cellElement, cellIndex, bombs)`** che gestisce il click sulle celle:
            - Chiama **`checkForBomb(cellIndex, bombs)`** che verifica se l'indice della cella cliccata corrisponde a un indice presente nell'array di bombe.
            - `Se` la cella non è una bomba e non è stata cliccata precedentemente:
                1. La cella diventa sicura e aggiunge la classe `ms_flower`.
                2. Richiama **`updateScore()`** che
                    - Aumenta il punteggio di 1,
                    - Aggiorna il valore del punteggio visualizzato a schermo,
                    - `Se` il punteggio corrisponde al numero totale di celle meno il numero di bombe presenti il gioco termina con la vittoria del giocatore e viene richiamata **`endGame(true)`** che:
                        1. Dichiara una variabile che seleziona il messaggio visualizzato,
                        2. `Se` il l'argomento è `true` modifica il messaggio visualizzato in "Hai vinto!",
                        3. `Altrimenti se` l'argomento è `false` modifica il messaggio visualizzato in "Hai perso.",
                        4. Mostra a schermo il messaggio.
            - `Altrimenti se` la cella è una bomba:
                1. Viene aggiunta la classe `ms_bomb`.
                2. Il gioco termina con la sconfitta del giocatore e viene richiamata **`endGame(false)`**.
        2. appende la cella al frammento,
        3. pusha la cella nell'array di celle.
    - Appende il frammento alla griglia di gioco,
    - Restituisce l'array delle celle.