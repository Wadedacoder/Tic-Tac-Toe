const Turn = {
    Cross: 'X',
    Circle: 'O'
} 

// Global Variables
CurrentTurn = Turn.Cross;
GameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

isFinished = false;


function UpdateUI() {
    // Update the UI
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3 ; j++) {
            document.getElementById(i * 3 + j).innerHTML = GameBoard[i][j];
        }
    }

    string = `Current Turn: ${CurrentTurn}`;
    // Update the turn
    document.getElementById('turn').innerHTML = string;
}


function CellClicked(idx) {
    if (isFinished) {
        return;
    }
    row = Math.floor(idx / 3);
    column = idx % 3;
    // alert('Row: ' + row + ' Column: ' + column);
    // Check if the cell is empty
    if (GameBoard[row][column] == '') {
        // Update the cell
        GameBoard[row][column] = CurrentTurn;

        // Update the UI
        document.getElementById(idx).innerHTML = CurrentTurn;

        //Check if the game is over
        GameLoop();

        // Change the turn
        ChangeTurn();

        // Update the UI
        UpdateUI();
    } else {
        alert('Cell is not empty');
    }
}

// Function to change the turn
function ChangeTurn() {
    if (CurrentTurn === Turn.Cross) {
        CurrentTurn = Turn.Circle;
    } else {
        CurrentTurn = Turn.Cross;
    }
    // alert('Current Turn: ' + CurrentTurn);
}

// Function to check if the game is over
function CheckGameOver() {
    // Check if any row is filled
    for (let i = 0; i < 3; i++) {
        if (GameBoard[i][0] == GameBoard[i][1] && GameBoard[i][1] == GameBoard[i][2] && GameBoard[i][0] != '') {
            return true;
        }
    }

    // Check if any column is filled
    for (let i = 0; i < 3; i++) {
        if (GameBoard[0][i] == GameBoard[1][i] && GameBoard[1][i] == GameBoard[2][i] && GameBoard[0][i] != '') {
            return true;
        }
    }

    // Check if any diagonal is filled
    if (GameBoard[0][0] == GameBoard[1][1] && GameBoard[1][1] == GameBoard[2][2] && GameBoard[0][0] != '') {
        return true;
    }

    if (GameBoard[0][2] == GameBoard[1][1] && GameBoard[1][1] == GameBoard[2][0] && GameBoard[0][2] != '') {
        return true;
    }

    return false;
}

// Function to check if the game is a draw
function CheckDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // If any cell is empty, the game is not a draw
            if (GameBoard[i][j] == '') {
                return false;
            }
        }
    }

    return true;
}

function GameLoop() {
    // Check if the game is over
        if (CheckGameOver()) {
            alert('Game Over');
            isFinished = true;

        }

        if (CheckDraw()) {
            alert('Draw');
            isFinished = true;
        }

        // ChangeTurn();
}

function Reset() {
    // Reset the game board
    GameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Current turn is cross
    CurrentTurn = Turn.Cross;

    // Game is not finished
    isFinished = false;

    // Update the UI
    UpdateUI();

}

// Once the page is loaded, add event listeners to all the cells
window.onload = function() {
    // Add event listeners to all the cells
    for(let i = 0; i < 9; i++) {
        document.getElementById(i).addEventListener('click', function() {
            CellClicked(i);
        });
    }

    document.getElementById('reset').addEventListener('click', function() {
        Reset();
    });

    UpdateUI();
}
