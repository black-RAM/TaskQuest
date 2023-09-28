// Define types for your data
type Priority = 1 | 2 | 3;
type Difficulty = 1 | 2 | 3;

class ToDo {
  title: string;
  description: string;
  priority: Priority;
  difficulty: Difficulty;
  due: Date;

  constructor(title: string, description: string, dueDate: Date, difficulty: Difficulty, priority: Priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.difficulty = difficulty;
    this.due = dueDate;
  }
}

class Project {
  name: string;
  todos: ToDo[];

  constructor(projectName: string, initialToDos?: ToDo[]) {
    this.name = projectName;
    this.todos = initialToDos || [];
    projects.push(this);
  }

  addToDo(todo: ToDo) {
    this.todos.push(todo);
  }
}

const projects: Project[] = [];

export { projects, Project, ToDo };