import { filterImportant, filterThisWeek, filterToday, noFilter } from "./filters";
import { addProject } from "./display";
import { pubSub } from "./pubsub";

class ToDo {
  projectName: String;
  checked: Boolean;

  constructor(
    public title: string,
    public description: string,
    public due: Date,
    public priorityNum: Number
  ) {
    this.checked = false;
    this.projectName = "";
  }

  toggleCheck() {
    this.checked = !this.checked
  }

  getPriorityWord() {
    return this.priorityNum === 3 ? "high" : this.priorityNum === 2 ? "medium" : this.priorityNum === 1 ? "low" : "";
  }

  setTitle(newTitle: string) {
    this.title = newTitle
  }

  setDetails(newDetails: string) {
    this.description = newDetails
  }

  setDate(newDate: Date) {
    this.due = newDate
  }

  setPriority(newPriority: number) {
    this.priorityNum = newPriority
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
        todo.projectName = this.name;
        pubSub.publish("todo-counted", this.index)
      })
      pubSub.publish("todo-stored", this.initialTodos)
    }

  }

  addToDo(todo: ToDo) {
    const index = this.todos.length;
    todo.projectName = this.name;
    this.todos.push(todo);
    pubSub.publish("todo-added", [todo, index, this]);

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
    this.todos = this.todos.filter(todo => todo.projectName !== deletion.name)
  }
}

// Create categories with custom filter functions
const allTasksCategory = new Category("All Tasks", noFilter, "bi-calendar-check-fill")
const importantCategory = new Category("Important", filterImportant, "bi-star-fill")
const todayCategory = new Category("Today", filterToday, "bi-calendar-event-fill")
const thisWeekCategory = new Category("This Week", filterThisWeek, "bi-calendar-week-fill")

export { Category, Project, ToDo, allTasksCategory };