const title = "BattleShip - Les Influenceurs"
document.title = title;
const container = document.getElementById('container');

// Page Title *****
const containerTitle = document.createElement('h1');
containerTitle.innerHTML = title;
container.appendChild(containerTitle);

const containerTagline = document.createElement('p');
containerTagline.innerHTML = "Full Javascript battleship"
containerTagline.setAttribute('id', 'tagline');
container.appendChild(containerTagline);

//Game container *****
const gameContainer = document.createElement('div');

// stat game button
const startGameBtn = document.createElement('button');
startGameBtn.innerHTML = "Start The Battleship";
startGameBtn.setAttribute('id', 'startGameBtn');
startGameBtn.addEventListener('click', function(){
  startGameBtn.style.display = "none";
  //TODO
  // show game
});
gameContainer.appendChild(startGameBtn);
gameContainer.setAttribute('id', 'game-container');
container.appendChild(gameContainer);