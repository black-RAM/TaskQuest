import { filterImportant, filterThisWeek, filterToday, noFilter } from "./filters";
import { addProject } from "./display";
import { pubSub } from "./pubsub";

class ToDo {
  parent: Project;
  checked: Boolean;
  index: Number;

  constructor(
    public title: string,
    public description: string,
    public due: Date,
    public priorityNum: Number
  ) {
    this.parent = orphan
    this.checked = false;
    this.index = -1
  }

  toggleCheck() {
    this.checked = !this.checked
  }

  getPriorityWord() {
    return this.priorityNum === 3 ? "high" : this.priorityNum === 2 ? "medium" : this.priorityNum === 1 ? "low" : "";
  }

  getProjectName() {
    return this.parent.name
  }

  updateProperties(newTitle: string, newDetails: string, newDate: Date, newPriority: number) {
    this.title = newTitle
    this.description = newDetails
    this.due = newDate
    this.priorityNum = newPriority
    pubSub.publish("todo-updated", [this, this.index, this.parent])
  }
}

class Project {
  todos: ToDo[];
  index: Number;

  constructor(
    public name: string,
    public initialTodos?: ToDo[],
    public icon: String = "bi-calendar-fill"
  ) {
    this.todos = [];
    projects.push(this);
    this.index = projects.indexOf(this);
    addProject(this)

    if (this.initialTodos) {
      this.initialTodos.forEach(todo => {
        todo.parent = this;
        pubSub.publish("todo-counted", this.index)
      })
      pubSub.publish("todo-stored", this.initialTodos)
    }

  }

  addToDo(todo: ToDo) {
    todo.index = this.todos.length;
    todo.parent = this;
    this.todos.push(todo);
    pubSub.publish("todo-added", [todo, todo.index, this, true]);

    if (!this.initialTodos?.includes(todo)) {
      pubSub.publish("todo-stored", [todo])
      pubSub.publish("todo-counted", this.index)
    }
  }

  deleteToDo(todo: ToDo) {
    const index = this.todos.indexOf(todo)
    const deletion = this.todos.splice(index, 1)[0]
    pubSub.publish("todo-deleted", index)
    pubSub.publish("todo-storage-deleted", deletion)
  }

  delete() {
    const index = projects.indexOf(this);
    const deletion = projects.splice(index, 1)[0];
    pubSub.publish("project-deleted", index)
    pubSub.publish("project-storage-deleted", deletion)
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
    pubSub.subscribe("project-storage-deleted", this.removeProject.bind(this))
  }

  updateCategory(newToDos: ToDo[]) {
    this.todos = this.filterFunction([...this.todos, ...newToDos]);
  }

  removeFromCategory(deletion: ToDo) {
    this.todos = this.todos.filter(todo => todo !== deletion)
  }

  removeProject(deletion: Project) {
    this.todos = this.todos.filter(todo => todo.parent !== deletion)
  }
}

// Create categories with custom filter functions
const allTasksCategory = new Category("All Tasks", noFilter, "bi-calendar-check-fill")
const importantCategory = new Category("Important", filterImportant, "bi-star-fill")
const todayCategory = new Category("Today", filterToday, "bi-calendar-event-fill")
const thisWeekCategory = new Category("This Week", filterThisWeek, "bi-calendar-week-fill")

// bogus project for todos without assigned parent property
const orphan = new Project("Orphan")

export { Category, Project, ToDo, allTasksCategory };