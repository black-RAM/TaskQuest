import "./style.scss";
import { projects, Project, ToDo } from "./app";

const math = new ToDo("Math homework", "Exercise 11.1, Exercise 11.2, Exercise 11.3", "Thursday", "hard", "high");

console.log(math)

const homeworkProject = new Project("homework");
homeworkProject.addToDo(math);
console.log(homeworkProject)

console.log(projects)