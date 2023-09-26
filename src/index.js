import "./style.scss";

class ToDo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.due = dueDate;
  }
}

const math = new ToDo("Math homework", "Exercise 11.1, Exercise 11.2, Exercise 11.3", "Thursday", "high");

console.log(math)