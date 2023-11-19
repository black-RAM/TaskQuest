import { hasVisited, populateInitialProjects, loadData, setVisitedFlag } from "./storage"
import { filterImportant, filterThisWeek, filterToday, noFilter } from "./filters";
import { addProject } from "./display";
import { pubSub } from "./pubsub";
import { Game } from "./games";
import "./sw"

let projects: Project[] = [];

class ToDo {
  checked: Boolean;
  index: Number;
  parent: string;

  constructor(
    public title: string,
    public description: string,
    public due: Date,
    public priorityNum: Number
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
    pubSub.publish("todo-updated", [this, this.index])
    pubSub.publish("data-change", projects)
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

  constructor(
    public name: string,
    public initialTodos?: ToDo[],
    public icon: String = "bi-calendar-fill"
  ) {
    super()
    projects.push(this);
    this.index = projects.indexOf(this);
    addProject(this)

    if (this.initialTodos) {
      this.initialTodos.forEach(todo => {
        todo.parent = this.name;
        pubSub.publish("todo-counted", [this.index, true])
        pubSub.publish("data-change", projects)
      })
      pubSub.publish("todo-stored", this.initialTodos)
    }

    // handle when todo needs to be deleted
    pubSub.subscribe(`deletion-in-${this.name}`, this.deleteToDo.bind(this))
  }

  addToDo(todo: ToDo) {
    todo.index = this.todos.length;
    todo.parent = this.name;
    this.todos.push(todo);
    pubSub.publish("todo-added", [todo, todo.index, true, true]);

    if (!this.initialTodos?.includes(todo)) {
      pubSub.publish("todo-stored", [todo])
      pubSub.publish("todo-counted", [this.index, true])
    }

    pubSub.publish("data-change", projects)
  }

  deleteToDo(todo: ToDo) {
    const index = this.todos.indexOf(todo)
    const deletion = this.todos.splice(index, 1)[0]
    pubSub.publish("todo-counted", [this.index, false])
    pubSub.publish("todo-storage-deleted", deletion)
    pubSub.publish("data-change", projects)
    pubSub.publish("todo-deleted", index)
  }

  delete() {
    const index = projects.indexOf(this);
    const deletion = projects.splice(index, 1)[0];
    pubSub.publish("project-deleted", index)
    pubSub.publish("project-storage-deleted", deletion)
    pubSub.publish("data-change", projects)
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
new Game("Cross Code", "./thumbnails/cross-code.jpg", "https://www.cross-code.com/en/start")
new Game("Missile Game", "./thumbnails/missile-game.jpg", "https://missile-game.bwhmather.com/")
new Game("Chrome Dino", "./thumbnails/chrome-dino.jpeg", "https://chromedino.com/")

// storage-related function calls
if (!hasVisited()) {
  populateInitialProjects()
  setVisitedFlag()
} else {
  projects = loadData()
}

export { Category, Project, ToDo, allTasksCategory };