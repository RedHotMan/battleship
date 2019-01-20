export class Stats {
  constructor(){
    this.init();
  }

  init() {
    // const gameContainer = document.getElementById('game-container');
    console.log(localStorage.getItem('stats'));
  }

  clearStats(){
    localStorage.removeItem('stats');
  }
}