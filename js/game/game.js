import { CONST } from './constants.js';
import { Fleet } from './fleet.js';
import { Grid } from './grid.js';
import { Stats } from './../stats.js';

export class Game {
  constructor() {
    this.stats = {
      games: 0,
      shoots: 0,
      looses: 0,
      wins: 0,
    }
    this.size = 10;
    this.gameOver = false;
    this.createGrid();
    this.init();
    this.getStats();
    this.incrementGames();
  }

  createGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.setAttribute('class', 'grid-container');

    const gridPlayer = document.createElement('div');
    const gridAI = document.createElement('div');
    gridPlayer.setAttribute('class', 'grid human-player');
    gridAI.setAttribute('class', 'grid computer-player');
    const grids = [gridPlayer, gridAI];

    for(let i = 0; i < grids.length; i++){
      for(let x = 0; x < this.size; x++){
        for(let y = 0; y < this.size; y++){
          const el = document.createElement('div');
          el.setAttribute('data-x', x);
          el.setAttribute('data-y', y);
          el.setAttribute('class', 'grid-cell grid-cell-' + x + '-' + y);
          grids[i].appendChild(el);
        }
      }
    }
    
    const gameContainer = document.getElementById('game-container');
    gridContainer.appendChild(gridPlayer);
    gridContainer.appendChild(gridAI);
    gameContainer.appendChild(gridContainer);
  }

  init(){
    this.playerGrid = new Grid();
    this.AIGrid = new Grid();
    this.playerFleet = new Fleet(this.playerGrid, CONST.HUMAN_PLAYER);
    this.AIFleet = new Fleet(this.AIGrid, CONST.AI_PLAYER);

    this.playerFleet.placeShipsRandomly();
    this.AIFleet.placeShipsRandomly();

    const computerCells = document.querySelector('.computer-player').childNodes;
    for(let i = 0; i < computerCells.length; i++) {
      computerCells[i].addEventListener('click', () => {this.shootListener()}, false);
    }
  }

  checkIfWin() {
    if (this.AIFleet.fleetDestroyed()) {
      alert('Congratulations, you win!');
      this.gameOver = true;
      this.incrementWins();
    } else if (this.playerFleet.fleetDestroyed()) {
      alert('Yarr! The computer sank all your ships. Try again.');
      this.gameOver = true;
      this.incrementLooses();
    }
  }

  shoot(x, y, targetPlayer) {
    let targetGrid, targetFleet;
    if (targetPlayer === CONST.HUMAN_PLAYER) {
      targetGrid = this.playerGrid;
      targetFleet = this.playerFleet;
    } else {
      this.incrementShoots();
      targetGrid = this.AIGrid;
      targetFleet = this.AIFleet;
    }

    if (targetGrid.isUndamagedShip(x, y)) {
      targetGrid.updateCell(x, y, 'hit', targetPlayer);
      targetFleet.findShipByCoords(x, y).incrementDamage();
      this.checkIfWin();
      return CONST.TYPE_HIT;
    }
    else if(targetGrid.isDamagedShip(x, y) || targetGrid.isMiss(x, y)){
      return null;
    }
    else {
      targetGrid.updateCell(x, y, 'miss', targetPlayer);
      return CONST.TYPE_MISS;
    }
  }

  shootListener () {
    const target = event.target;
    const x = parseInt(target.getAttribute('data-x'), 10);
    const y = parseInt(target.getAttribute('data-y'), 10);

    let result = null;
    result = this.shoot(x, y, CONST.AI_PLAYER);

    if (result !== null && !this.gameOver) {
      const randomX = Math.floor(10 * Math.random());
      const randomY = Math.floor(10 * Math.random());
      this.shoot(randomX, randomY, CONST.HUMAN_PLAYER);
    }
    else {
      this.gameOver = true;
    }
  }

  // Handle the stats localStorage
  getStats(){
    const stats = JSON.parse(localStorage.getItem('stats'));
    if ( stats != null) {
      const { games, shoots, wins, looses } = stats;
      this.stats.games = games;
      this.stats.shoots = shoots;
      this.stats.wins = wins;
      this.stats.looses = looses;
    }
  }

  incrementGames() {
    this.stats.games++;
    this.saveStats();
  }

  incrementWins(){
    this.stats.wins++;
    this.saveStats();
  }

  incrementLooses(){
    this.stats.looses++;
    this.saveStats();
  }

  incrementShoots(){
    this.stats.shoots++;
    this.saveStats();
  }

  saveStats(){
    localStorage.setItem('stats', JSON.stringify(this.stats));
  }
}

