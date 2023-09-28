// application logic
const projects = []

class Project {
  constructor(projectName, initialToDos) {
    this.name = projectName;
    this.todos = initialToDos || []; // To-dos are organized as projects
    projects.push(this); // add this Project to list of projects
  }

  addToDo(todo) {
    this.todos.push(todo);
  }
}

class ToDo {
  constructor(title, description, dueDate, difficulty, priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.difficulty = difficulty;
    this.due = dueDate;
  }
}

export { projects, Project, ToDo }