import "./style.scss";

const projects = []

class Project {
  constructor(projectName) {
    this.name = projectName;
    this.todos = [];
    projects.push(this)
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

const math = new ToDo("Math homework", "Exercise 11.1, Exercise 11.2, Exercise 11.3", "Thursday", "hard", "high");

console.log(math)

const homeworkProject = new Project("homework");
homeworkProject.addToDo(math);
console.log(homeworkProject)

console.log(projects)