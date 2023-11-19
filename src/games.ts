class GamePanel{
  games: Game[]

  constructor() {
    this.games = []
  }

  addGame(newGame: Game) {
    this.games.push(newGame)
  }
}

class Game {
  constructor(
    public name: string,
    public iconFilePath: string,
    public link: string
  ) {
    gamePanel.addGame(this)
  }
}

const gamePanel = new GamePanel()

export { gamePanel, Game }