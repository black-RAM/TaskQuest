type Scale = 1 | 2 | 3;

class ToDo {
  constructor(
    public title: string,
    public description: string,
    public due: Date,
    public priority: Scale
  ) { }
}

class Project {
  constructor(
    public name: string,
    public todos: ToDo[] = []
  ) {
    projects.push(this);
  }

  addToDo(todo: ToDo) {
    this.todos.push(todo);
  }

  finishToDo(title: string) {
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