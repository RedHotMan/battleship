export class Stats {
  constructor(){
    this.stats = JSON.parse(localStorage.getItem('stats'));
    this.gameContainer = document.getElementById('game-container');
    this.init();
  }

  init() {
    if (this.stats != null) {

      const nbGames = document.createElement('p');
      nbGames.innerHTML = `Number of Games: ${this.stats.games}`;

      const nbWins = document.createElement('p');
      nbWins.innerHTML = `Number of Wins: ${this.stats.wins}`;

      const nbLooses = document.createElement('p');
      nbLooses.innerHTML = `Number of Looses: ${this.stats.looses}`;
      
      const nbShoots = document.createElement('p');
      nbShoots.innerHTML = `Number of Shoots: ${this.stats.shoots}`;

      this.gameContainer.appendChild(nbGames);
      this.gameContainer.appendChild(nbWins);
      this.gameContainer.appendChild(nbLooses);
      this.gameContainer.appendChild(nbShoots);

      const clearStatsBtn = document.createElement('button');
      clearStatsBtn.innerHTML = "Clear stats";
      clearStatsBtn.addEventListener('click', () => {
        this.clearStats();
      });
      this.gameContainer.appendChild(clearStatsBtn);
    }
    else {
      this.noStats();
    }
  }

  noStats() {
    this.gameContainer.innerHTML = "";
    const noStats = document.createElement('p');
    noStats.innerHTML = "No stats at that time";
    this.gameContainer.appendChild(noStats);
  }

  clearStats(){
    localStorage.removeItem('stats');
    this.stats = {
      games: 0,
      wins: 0,
      looses: 0,
      shoots: 0,
    };
    this.noStats();
  }
}