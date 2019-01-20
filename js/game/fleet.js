import { CONST } from './constants.js';
import { Ship } from './ship.js';
import { Game } from './game.js';

export class Fleet{
  constructor(playerGrid, player) {
    this.numShips = CONST.AVAILABLE_SHIPS.length;
    this.playerGrid = playerGrid;
    this.player = player;
    this.fleetList = [];
    this.populate();
  }

  populate() {
    for(let i = 0; i < this.numShips; i++){
      const z = i % CONST.AVAILABLE_SHIPS.length;
      this.fleetList.push(new Ship(CONST.AVAILABLE_SHIPS[z], this.playerGrid, this.player));
    }
  }

  placeShipsRandomly() {
    let shipCoords;
    for (let i = 0; i < this.fleetList.length; i++) {
      let illegalPlacement = true;

      do{
        const randomX = Math.floor(10 * Math.random());
        const randomY = Math.floor(10 * Math.random());
        const randomDirection = Math.floor(2*Math.random());

        if (this.fleetList[i].isLegal(randomX, randomY, randomDirection)) {
          this.fleetList[i].create(randomX,randomY, randomDirection);
          shipCoords = this.fleetList[i].getAllShipCells();
          illegalPlacement = false;
        }
      }while(illegalPlacement);

      for (var j = 0; j < shipCoords.length; j++) {
        this.playerGrid.updateCell(shipCoords[j].x, shipCoords[j].y, 'ship', this.player);
      }
    }
  }

  findShipByCoords(xPosition, yPosition) {
    for(let i = 0; i < this.fleetList.length; i++) {
      const currentShip = this.fleetList[i];
      if (currentShip.direction === CONST.DIRECTION_VERTICAL) {
        const xMax = currentShip.x + currentShip.shipLength;
        if (yPosition === currentShip.y && xPosition >= currentShip.x && xPosition < xMax) {
          return currentShip
        }
      }
      else {
        const yMax = currentShip.y + currentShip.shipLength;
        if (xPosition === currentShip.x && yPosition >= currentShip.y && yPosition < yMax) {
          return currentShip
        }
      }
    }
    return null
  }

  fleetDestroyed(){
    for (let i = 0; i < this.fleetList.length; i++) {
      // If one or more ships are not sunk, then the sentence "all ships are sunk" is false.
      if (this.fleetList[i].sunk === false) {
        return false;
      }
    }
    return true;
  }
}