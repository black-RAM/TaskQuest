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
    pubSub.publish("todo-stored", this.initialTodos)
  }

  addToDo(todo: ToDo) {
    todo.projectName = this.name;
    this.todos.push(todo);
    pubSub.publish("todo-added", todo);

    if (!this.initialTodos?.includes(todo)) {
      pubSub.publish("todo-stored", [todo])
    }
  }

  deleteToDo(title: string) {
    this.todos = this.todos.filter(
      item => item.title !== title
    );
  }

  delete() {
    let index = projects.indexOf(this);
    projects.splice(index, 1);
  }
}

const projects: Project[] = [];

class Category {
  todos: ToDo[];

  constructor(public name: string, private filterFunction: (todos: ToDo[]) => ToDo[]) {
    this.todos = [];
    pubSub.subscribe("todo-stored", this.updateCategory.bind(this))
  }

  updateCategory(newToDos: ToDo[]) {
    this.todos = this.filterFunction([...this.todos, ...newToDos]);
  }
}

// Create categories with custom filter functions
const allTasksCategory = new Category("ALl Tasks", noFilter)
const importantCategory = new Category("Important", filterImportant)
const thisWeekCategory = new Category("This Week", filterThisWeek)
const todayCategory = new Category("Today", filterToday)

// test; timeout to allow project constructors to finish running
setTimeout(() => {
  console.log(allTasksCategory.todos)
}, 5);

export { Project, ToDo };