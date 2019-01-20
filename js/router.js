import { Game } from './game/game.js';
import { Stats } from './stats.js';

const classes = {
  Game,
  Stats
};

export class Router{
  constructor(){
    this.routes = {
      '#/game': 'Game',
      '#/stats': 'Stats',
    }

    window.addEventListener('hashchange', () => {
      this.onRouteChange();

    });

    // Main container
    this.container = document.getElementById('container');
    
    //Game container *****
    this.gameContainer = document.createElement('div');

    this.init();
  }

  init(){
    const title = "BattleShip - Les Influenceurs"
    document.title = title;

    // Page Title *****
    const containerTitle = document.createElement('h1');
    containerTitle.innerHTML = title;
    containerTitle.setAttribute('class', 'text-center');
    this.container.appendChild(containerTitle);

    const containerTagline = document.createElement('p');
    containerTagline.innerHTML = "Full Javascript battleship"
    // containerTagline.setAttribute('id', 'tagline');
    containerTagline.setAttribute('class', 'text-center');
    this.container.appendChild(containerTagline)

    // start game button
    const startGameBtn = document.createElement('a');
    startGameBtn.innerHTML = "Start The Battleship";
    startGameBtn.setAttribute('id', 'startGameBtn');
    startGameBtn.setAttribute('class', 'btn btn-success');
    startGameBtn.setAttribute('href', '#/game');

    // stats button
    const statsBtn = document.createElement('a');
    statsBtn.innerHTML = 'Stats';
    statsBtn.setAttribute('id', 'statsBtn');
    statsBtn.setAttribute('class', 'btn');
    statsBtn.setAttribute('href', '#/stats');

    this.container.appendChild(startGameBtn);
    this.container.appendChild(statsBtn);
    this.gameContainer.setAttribute('id', 'game-container');
    this.container.appendChild(this.gameContainer);
  }

  onRouteChange() {
    const hash = window.location.hash;
    if(Object.keys(this.routes).includes(hash)) {
      this.gameContainer.innerHTML = '';
      new DynamicClass(this.routes[hash]);
    }
    else{
      console.log('404')  
    }
  }
}

class DynamicClass{
  constructor(className) {
    return new classes[className];
  }
}
