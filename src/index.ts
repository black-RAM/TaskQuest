import "./style.scss";
import { projects, Project, ToDo } from "./app";

const defaultProject = new Project("Default Project", [
  new ToDo("Math homework", "Do math exercises", new Date('2023-09-30T12:00:00'), 3, 3),
  new ToDo("Chores", "Wash the Dishes", new Date('2023-09-30T12:00:00'), 3, 3)
]);

console.log(defaultProject)