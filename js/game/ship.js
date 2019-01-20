import { CONST } from './constants.js';

export class Ship{
  constructor(type, playerGrid, player) {
    this.damage = 0;
    this.playerGrid = playerGrid;
    this.player = player;

    switch (type) {
      case CONST.AVAILABLE_SHIPS[0]:
        this.shipLength = 5;
        break;
      case CONST.AVAILABLE_SHIPS[1]:
        this.shipLength = 4;
        break;
      case CONST.AVAILABLE_SHIPS[2]:
        this.shipLength = 3
        break;
      case CONST.AVAILABLE_SHIPS[3]:
        this.shipLength = 3
        break;
      case CONST.AVAILABLE_SHIPS[4]:
        this.shipLength = 2
        break;
      default:
        this.shipLength = 2;
        break;
    }


    this.maxDamage = this.shipLength;
    this.sunk = false;
  }

  create(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  isLegal(x, y, direction) {
    if (this.withinBounds(x, y, direction)) {
      for (let i = 0; i < this.shipLength; i++) {
        if (direction === CONST.DIRECTION_VERTICAL) {
          if (this.playerGrid.cells[x+i][y] === CONST.TYPE_SHIP
            || this.playerGrid.cells[x+i][y] === CONST.TYPE_MISS
            || this.playerGrid.cells[x+i][y] === CONST.TYPE_SUNK
          )
          {
            return false;
          }
          else {
            if (this.playerGrid.cells[x][y+i] === CONST.TYPE_SHIP
              || this.playerGrid.cells[x][y+i] === CONST.TYPE_MISS
              || this.playerGrid.cells[x][y+i] === CONST.TYPE_SUNK
            )
            {
              return false;
            }
          }
        }
      }
      return true;
    }
    else {
      return false;
    }
  }

  withinBounds(x, y, direction) {
    if(direction === CONST.DIRECTION_VERTICAL) {
      return (x + this.shipLength) <= 10;
    } else {
      return (y + this.shipLength) <= 10;
    }
  }

  getAllShipCells() {
    const resultObject = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (this.direction === CONST.DIRECTION_VERTICAL) {
        resultObject[i] = {'x': this.x + i, 'y': this.y};
      } else {
        resultObject[i] = {'x': this.x, 'y': this.y + i};
      }
    }
    return resultObject;
  }

  incrementDamage(){
    this.damage += 1; 
    if (this.damage >= this.maxDamage) {
      this.sunk = true;
      const allCells = this.getAllShipCells();
      for (var i = 0; i < this.shipLength; i++) {
        this.playerGrid.updateCell(allCells[i].x, allCells[i].y, 'sunk', this.player);
      }
    }
  }
}