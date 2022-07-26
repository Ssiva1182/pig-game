'use strict';

const Player0EL = document.querySelector('.player--0');
const Player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const scoreEL = document.querySelector('#score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnROll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

//starting conditions
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  scoreEL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  diceL.classList.add('hidden');
  Player0EL.classList.remove('player--winner');
  Player1EL.classList.remove('player--winner');
  Player0EL.classList.add('player--active');
  Player1EL.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Player0EL.classList.toggle('player--active');
  Player1EL.classList.toggle('player--active');
};

btnROll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceL.classList.remove('hidden');
    diceL.src = `dice-${dice}.png`;

    //check if player rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if true switch to player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //add current score to active players score
  // scores[1] =scores[1] +currentScore
  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //check if its less than 100
    if (score[activePlayer] >= 20) {
      playing = false;
      diceL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
    }
    //yes finish game
    //switch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
