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
    this.projectName = "undefined";
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
  }

  addToDo(todo: ToDo) {
    todo.projectName = this.name;
    this.todos.push(todo);
    pubSub.publish("todo-added", todo);
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

export { projects, Project, ToDo };