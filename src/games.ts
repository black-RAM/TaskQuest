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
    public link: string,
    public cost: number
  ) {
    gamePanel.addGame(this)
  }
}

class Bank {
  private coins: number

  constructor() {
    this.coins = 0
  }

  deposit(amount: number) {
    this.coins += amount
  }

  deduct(amount: number) {
    const deductible = (this.coins - amount) >= 0

    if(deductible) {
      this.coins -= amount
    } else {
      this.coins = 0
    }

    return deductible
  }

  showBalance() {
    return this.coins
  }
}

const gamePanel = new GamePanel()
const bank = new Bank()

export { gamePanel, Game, bank }