import { CONST } from './constants.js';
import { checkTargetPlayer } from './player.js';

export class Grid{
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

  updateCell(x, y, type, targetPlayer) {
    let player = checkTargetPlayer(targetPlayer);

    switch (type) {
      case CONST.CSS_TYPE_EMPTY:
        this.cells[x][y] = CONST.TYPE_EMPTY;
        break;
      case CONST.CSS_TYPE_SHIP:
        this.cells[x][y] = CONST.TYPE_SHIP;
        break;
      case CONST.CSS_TYPE_MISS:
        this.cells[x][y] = CONST.TYPE_MISS;
        break;
      case CONST.CSS_TYPE_HIT:
        this.cells[x][y] = CONST.TYPE_HIT;
        break;
      case CONST.CSS_TYPE_SUNK:
        this.cells[x][y] = CONST.TYPE_SUNK;
        break;
      default:
        this.cells[x][y] = CONST.TYPE_EMPTY;
        break;
    }

    const classes = ['grid-cell', 'grid-cell-' + x + '-' + y, 'grid-' + type];
    const playerGrid = document.querySelector('.' + player);
    playerGrid.querySelector('.grid-cell-' + x + '-' + y).setAttribute('class', classes.join(' '));
  }

  isUndamagedShip(x, y) {
    return this.cells[x][y] === CONST.TYPE_SHIP;
  }

  isMiss(x, y) {
    return this.cells[x][y] === CONST.TYPE_MISS;
  }

  isDamagedShip(x, y) {
    return this.cells[x][y] === CONST.TYPE_HIT || this.cells[x][y] === CONST.TYPE_SUNK;
  }
}