/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, playerNames, gamePlaying, finalScore;

init ();

document.querySelector('.final-score').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        finalScore = document.querySelector('.final-score').value;
        console.log(finalScore)
    }
})

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
         //1.roll dice - random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2.Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3.Update the round score if the score was not 1
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
        //change player
        nextPlayer();
    }
        
    }
   
});

//hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //1. store the score
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //2. check if the game was won
    if (scores[activePlayer] >= finalScore) {
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('#name-' + activePlayer).textContent = 'Voittaja!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer();
    }
    }   
});

//New game button
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
};

function init() {
    scores = [0,0];  // scores for both players
    roundScore = 0;  // variable for the roundscore, only one value since we have 1 roundscore at the time
    activePlayer = 0; //for the player that is currently playing
    playerNames = ['Pelaaja 1', 'Pelaaja 2'];
    gamePlaying = true;
    finalScore = 100

    document.querySelector('#name-0').textContent = playerNames[0]; //calling playernames
    document.querySelector('#name-1').textContent = playerNames[1];

    //Dice display hidden in the beginning
    document.querySelector('.dice').style.display = 'none';

    //scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //active player panels reset
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
};





