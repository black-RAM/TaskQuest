import "./style.scss";
import { projects, Project, ToDo } from "./app";

const defaultProject = new Project("Default Project", [
  new ToDo("Math homework", "Do math exercises", "Thursday", "medium", "high"),
  new ToDo("Chores", "Wash the Dishes", "tonight", "easy", "low")
]);

console.log(defaultProject)