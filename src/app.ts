import { filterImportant, filterThisWeek, filterToday, noFilter } from "./filters";
import { addProject } from "./display";
import { pubSub } from "./pubsub";

type Scale = 1 | 2 | 3;

class ToDo {
  priority: String;
  projectName: String;

  constructor(
    public title: string,
    public description: string,
    public due: Date,
    public priorityNum: Scale
  ) {
    this.priority = priorityNum === 3 ? "high" : priorityNum === 2 ? "medium" : "low";
    this.projectName = "";
  }
}

class Project {
  todos: ToDo[];

  constructor(
    public name: string,
    public initialTodos?: ToDo[],
    public icon: String = "bi-calendar-fill"
  ) {
    this.todos = [];
    projects.push(this);
    addProject(this)

    this.initialTodos?.forEach(todo => {
      todo.projectName = this.name;
    })
    pubSub.publish("todo-stored", this.initialTodos)
  }

  addToDo(todo: ToDo) {
    const index = this.todos.length;
    todo.projectName = this.name;
    this.todos.push(todo);
    pubSub.publish("todo-added", [todo, index, this]);

    if (!this.initialTodos?.includes(todo)) {
      pubSub.publish("todo-stored", [todo])
    }
  }

  deleteToDo(todo: ToDo) {
    const index = this.todos.indexOf(todo)
    const deletion = this.todos.splice(index, 1)[0]
    pubSub.publish("todo-deleted", index)
    pubSub.publish("todo-storage-deleted", deletion)
  }

  delete() {
    let index = projects.indexOf(this);
    projects.splice(index, 1);
  }
}

const projects: Project[] = [];

class Category {
  todos: ToDo[];

  constructor(
    public name: string,
    private filterFunction: (todos: ToDo[]) => ToDo[],
    public icon: String = "bi-calendar-fill"
  ) {
    this.todos = [];
    addProject(this)
    pubSub.subscribe("todo-stored", this.updateCategory.bind(this))
    pubSub.subscribe("todo-storage-deleted", this.removeFromCategory.bind(this))
  }

  updateCategory(newToDos: ToDo[]) {
    this.todos = this.filterFunction([...this.todos, ...newToDos]);
  }

  removeFromCategory(deletion: ToDo) {
    this.todos = this.todos.filter(todo => todo !== deletion)
  }
}

// Create categories with custom filter functions
const allTasksCategory = new Category("All Tasks", noFilter, "bi-calendar-check-fill")
const importantCategory = new Category("Important", filterImportant, "bi-star-fill")
const todayCategory = new Category("Today", filterToday, "bi-calendar-event-fill")
const thisWeekCategory = new Category("This Week", filterThisWeek, "bi-calendar-week-fill")

export { Category, Project, ToDo };