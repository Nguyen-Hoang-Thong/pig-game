/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying, temp, winScore;
gamePlaying = true;
temp = -1;

function start(){
    score = [0,0];
    roundScore = 0;
    activePlayer = 0; //choose among player 1 and 2

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
    gamePlaying = true;
}

start();

//document.querySelector('#current-' + activePlayer).textContent = dice;   //concat string  // # is id

//document.querySelector('#current-' + activePlayer).innerHTML = '<b>' + dice + '</b>'; //inner HTML must be in '' and + each element

var readScore = document.querySelector('#score-0').textContent;

console.log(readScore);

//document.querySelector('.dice').style.display = 'none';  // . is class

document.querySelector('.btn-roll').addEventListener('click', function(){
    var check = validateScore();
    if(check === false)
        return;
        
    if (gamePlaying){
        //annonymous function
        //1.random number
        var dice1 = Math.floor((Math.random() * 6)) + 1;  
        var dice2 = Math.floor((Math.random() * 6)) + 1;
        //2.Display result

        var dice1DOM = document.querySelector('#dice1'); //select dice
        dice1DOM.style.display = 'block';              // block display as a block
        dice1DOM.src = 'dice-' + dice1 + '.png';        //src img diceDOM already select dice class

        var dice2DOM = document.querySelector('#dice2'); 
        dice2DOM.style.display = 'block';              
        dice2DOM.src = 'dice-' + dice2 + '.png';        
        
        //3.Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1){ //&& dice !== temp){
            //Add score
            roundScore = roundScore + (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            // if (dice1 === 6)
            //     temp = 6;
            // else 
            //     temp = -1;
            
        } else{
            //temp = -1;  //using at exercise check two 6 in a row
            nextPlayer();
        }
    }
}); //1st arg is type of event, 2nd arg is function

document.querySelector('.btn-hold').addEventListener('click', function(){
    var check = validateScore();
    if(check === false)
        return;

    if (gamePlaying){
        //Add CURRENT score to TOTAL score
        score[activePlayer] += roundScore;

        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    
        //Check the winner
        if(score[activePlayer] >= winScore){
            document.querySelector('#name-'+activePlayer).innerHTML = '<b>' + 'WINNER' + '</b>';
            document.querySelector('#dice1').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';

            gamePlaying = false;
        } 
        else {
            //Next player
            nextPlayer();
        }
    }   
});



function nextPlayer(){
    //Next player
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1; //ternary operator
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');  //recommend when change lot of css
    document.querySelector('.player-1-panel').classList.toggle('active'); //toggle remove to add or reverse way

    //document.querySelector('.dice').style.display = 'none';
}

function validateScore(){
    var x = document.getElementById('winScore').value;
    if (x == ""){
        alert('Winning Score must be specified');
        return false;
    }
    else{
        winScore = document.getElementById('winScore').value;
        return true;
    }
}

document.querySelector('.btn-new').addEventListener('click', start); //arg is function













