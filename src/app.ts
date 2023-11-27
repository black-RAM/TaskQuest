import { hasVisited, populateInitialProjects, loadData, setVisitedFlag } from "./storage"
import { filterImportant, filterThisWeek, filterToday, noFilter } from "./filters";
import { addProject } from "./display";
import { Game, bank } from "./games";
import { pubSub } from "./pubsub";
import "./sw"

let projects: Project[] = [];

class ToDo {
  checked: Boolean;
  index: number;
  parent: string;

  constructor(
    public title: string,
    public description: string,
    public due: Date,
    public priorityNum: number
  ) {
    this.parent = "orphan"
    this.checked = false
    this.index = -1
  }

  toggleCheck() {
    this.checked = !this.checked
    pubSub.publish("data-change", projects)
  }

  getPriorityWord() {
    return this.priorityNum === 3 ? "high" : this.priorityNum === 2 ? "medium" : this.priorityNum === 1 ? "low" : "";
  }

  updateProperties(newTitle: string, newDetails: string, newDate: Date, newPriority: number) {
    this.title = newTitle
    this.description = newDetails
    this.due = newDate
    this.priorityNum = newPriority
    pubSub.publish("todo-updated", this)
    pubSub.publish("data-change", projects)
  }

  getWorth() : [worth: number, punctual: boolean] {
    let worth = this.priorityNum * 10

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueDate = new Date(this.due)
    dueDate.setHours(0, 0, 0, 0)

    const punctual = today <= dueDate;

    return [worth, punctual]
  }
}

class Group {
  todos: ToDo[]

  constructor() {
    this.todos = []
  }
}

class Project extends Group {
  index: Number;
  private count: number; // number of to-do being added to array (this.todos.length)

  constructor(
    public name: string,
    public initialTodos?: ToDo[],
    public icon: String = "bi-calendar-fill"
  ) {
    super()
    projects.push(this);
    this.index = projects.indexOf(this);
    addProject(this)
    
    this.count = -1
    this.registerInitialToDos()

    // handle when todo needs to be deleted
    pubSub.subscribe(`deletion-in-${this.name}`, this.deleteToDo.bind(this))
  }

  addToDo(todo: ToDo, moveOperation = false) {
    todo.index = ++this.count;
    todo.parent = this.name;
    this.todos.push(todo);
    pubSub.publish("todo-added", [todo, true, !moveOperation]);

    if (!this.initialTodos?.includes(todo)) {
      pubSub.publish("todo-stored", [todo])
      pubSub.publish("todo-counted", [this.index, true])
    }

    pubSub.publish("data-change", projects)
  }

  receiveDrop(toDoData: string) {
    const props: ToDo = JSON.parse(toDoData)
    const parent = projects.find(project => project.name == props.parent)
    if(parent) {
      const movingToDo = parent.deleteToDoByName(props.title)
      if(movingToDo) this.addToDo(movingToDo, true)
    }
  }

  deleteToDoByName(title: string) {
    const deletion = this.todos.find(todo => todo.title == title)
    if(deletion) this.deleteToDo(deletion, true)
    return deletion
  }

  deleteToDo(todo: ToDo, moveOperation = false) {
    const index = this.todos.indexOf(todo)
    const deletion = this.todos.splice(index, 1)[0]
    pubSub.publish("todo-counted", [this.index, false])
    pubSub.publish("todo-storage-deleted", deletion)
    pubSub.publish("data-change", projects)
    pubSub.publish("todo-deleted", todo.index)

    // award coins
    if(deletion.checked && !moveOperation) {
      const [reward, positive] = deletion.getWorth()

      if (positive) {
        bank.deposit(reward)  
        pubSub.publish("coin-message", 
          `Yay! You earned ${reward} coins. Total coins:  ${bank.showBalance()}`
        )
      } else if (bank.deduct(reward)) {
        pubSub.publish("coin-message", 
          `Late completion! You lost ${reward} coins. Balance: ${bank.showBalance()}`
        )
      } else {
        pubSub.publish("coin-message", 
          `Error! Coins to few to subtract from.`
        )
      }
    }
  }

  delete() {
    const index = projects.indexOf(this);
    const deletion = projects.splice(index, 1)[0];
    pubSub.publish("project-deleted", index)
    pubSub.publish("project-storage-deleted", deletion)
    pubSub.publish("data-change", projects)
  }

  private registerInitialToDos() {
    if (this.initialTodos) {
      this.initialTodos.forEach(todo => {
        todo.parent = this.name;
        pubSub.publish("todo-counted", [this.index, true])
        pubSub.publish("data-change", projects)
      })
      pubSub.publish("todo-stored", this.initialTodos)
    }
  }
}

class Category extends Group {

  constructor(
    public name: string,
    private filterFunction: (todos: ToDo[]) => ToDo[],
    public icon: String = "bi-calendar-fill"
  ) {
    super()
    addProject(this)
    pubSub.subscribe("todo-stored", this.updateCategory.bind(this))
    pubSub.subscribe("todo-storage-deleted", this.removeFromCategory.bind(this))
    pubSub.subscribe("project-storage-deleted", this.removeProject.bind(this))
  }

  updateCategory(newToDos: ToDo[]) {
    this.todos = this.filterFunction([...this.todos, ...newToDos]);
  }

  removeFromCategory(deletion: ToDo) {
    this.todos = this.todos.filter(todo => todo !== deletion)
  }

  removeProject(deletion: Project) {
    this.todos = this.todos.filter(todo => todo.parent !== deletion.name)
  }
}

// Create categories with custom filter functions
const allTasksCategory = new Category("All Tasks", noFilter, "bi-calendar-check-fill")
new Category("Important", filterImportant, "bi-star-fill")
new Category("Today", filterToday, "bi-calendar-event-fill")
new Category("This Week", filterThisWeek, "bi-calendar-week-fill")

// Create Games
new Game("Cross Code", "./thumbnails/cross-code.jpg", "https://www.cross-code.com/en/start", 60)
new Game("Missile Game", "./thumbnails/missile-game.jpg", "https://missile-game.bwhmather.com/", 40)
new Game("Chrome Dino", "./thumbnails/chrome-dino.jpeg", "https://chromedino.com/", 20)

// storage-related function calls
if (!hasVisited()) {
  populateInitialProjects()
  setVisitedFlag()
} else {
  projects = loadData()
}

export { Category, Project, ToDo, allTasksCategory };