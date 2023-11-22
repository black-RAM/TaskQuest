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

  constructor(
    private coins: number
  ) {}

  deposit(amount: number) {
    this.coins += amount
    this.store()
  }

  deduct(amount: number) {
    const deductible = (this.coins - amount) >= 0

    if(deductible) {
      this.coins -= amount
    } else {
      this.coins = 0
    }

    this.store()

    return deductible
  }

  showBalance() {
    return this.coins
  }

  private store() {
    localStorage.setItem("coins", String(this.coins))
  }
}

const gamePanel = new GamePanel()
const coins = Number(localStorage.getItem("coins"))
const bank = new Bank(coins)

export { gamePanel, Game, bank }