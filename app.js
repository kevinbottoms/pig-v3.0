/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
-If a player rolls two sixes in a row, he loses all current and all global points, and his turn is over
-

*/

var scores, roundScore, activePlayer, gamePlaying, lastRoll, winningScore; // Declare global variables

// Initialize game
function init() {
    scores = [0, 0]; // Player scores, first to 100 wins
    roundScore = 0; // Holds score before a hold or the roll of 1
    activePlayer = 0; // Keeps track of active player
    gamePlaying = true; // Only allows rolling and holding while there is no winner
    lastRoll = 0; // Used to keep track of last rolled value
    winningScore = 100;
    
    document.querySelector('.dice').style.display = 'none'; // Hides die at start and between turns

    // Initializes all scores to 0 and reset beginning attributes
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

// Roll Dice Event Listener
document.querySelector('.btn-roll').addEventListener('click', function () {
    // Check if a winner has already been declared
    if (gamePlaying) {
        // Generate random number 1-6
        var dice = Math.floor(Math.random() * 6) + 1;
        
        // Check if a player rolls two sixes in a row
        if (dice === 6 && lastRoll === 6) {
            
            // Reset last roll
            lastRoll = 0;
            
            // Clear Global Score
            scores[activePlayer] = 0;
            
            // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            
            // Switch player
            nextPlayer();
        } else {
            
            // Save roll
            lastRoll = dice;
            
            // Show die with generated number
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
    
            // Add die number to current score or switch turn on the roll of 1
            if (dice !== 1) {
                //add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer(); //Switches Player
            }
        }
    }
});

// Hold Button Event Listener
document.querySelector('.btn-hold').addEventListener('click', function () {
    // Check if a winner has already been declared
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;
        
        // Clear last rolled value
        lastRoll = 0;
        
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        // Assign user input to input variable
        var input = document.querySelector('.final-score').value;
        
        // Use user inut as final score if it has been entered
        if (input) {
            winningScore = input;
        } 
        
        // Check if player won
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer(); // Switches Player
        }
    }
});

// Resets and re-initializes game
document.querySelector('.btn-new').addEventListener('click', init);

// Switches Player
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastRoll = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice').style.display = 'none';
}

init(); // Start Game