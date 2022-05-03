const statusDisplay = document.querySelector('.game--status')

//This will be used to pause the game if someone wins

let gameActive = true

//Place to store the current player
let currentPlayer = 'X'

//Game state -  an array of empty strings that allow the game to be tracked
let gameState = ['', '', '', '', '', '', '', '','']

//Some messages to alert to players, alerting them of the victor and whos turn it is
let winningMessage = function(){
    return `Player ${currentPlayer} has won!`
}
let drawMessage = function(){
    return 'The game ended in a draw!'
}
let turnNotification = function(){
    return `It is ${currentPlayer}'s turn`
}

//Initial message to alert the turn

statusDisplay.innerHTML = turnNotification()

//Group of game action functions
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusDisplay.innerHTML = turnNotification()
}

/*const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function handleResultValidation(){
    let roundWon = false
    for(let i = 0; i <= 7; i++){
        const winCondition = winConditions[i]
        let a = gameState[winConditions[0]]
        let b = gameState[winConditions[1]]
        let c = gameState[winConditions[2]]
        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break
        }
    }
    if (roundWon){
        statusDisplay.innerHTML = winningMessage()
        gameActive = false
        return;
    }
    let roundDraw = !gameState.includes('')
    if (roundDraw){
        statusDisplay.innerHTML = drawMessage()
        gameActive = false
        return
    }
    handlePlayerChange()
}
*/

//

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes('')
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange()
}


//

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}


function handleRestartGame(){
    gameActive = true
    currentPlayer = 'X'
    gameState = ['', '', '', '', '', '', '', '']
    statusDisplay.innerHTML = turnNotification()
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '')
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame)

