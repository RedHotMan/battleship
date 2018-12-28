import { CONST } from './contants.js';

export class Game {
  constructor() {
    Game.size = 10;
    Game.usedShips = [
      CONST.UNUSED,
      CONST.UNUSED,
      CONST.UNUSED,
      CONST.UNUSED,
      CONST.UNUSED,
    ];
    this.createGrid();
    const grid = new Grid();
    console.log(grid);
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
      for(let x = 0; x < Game.size; x++){
        for(let y = 0; y < Game.size; y++){
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
}

class Grid{
  constructor(){
    this.size = 10;
    this.cells = [];
    this.init();
  }

  init() {
    for(let x = 0; x < this.size; x++){
      const row = [];
      this.cells[x] = row;
      for(let y = 0; y < this.size; y++){
        row.push(CONST.TYPE_EMPTY);
      }
    }
  }
}
