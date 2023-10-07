import "./style.scss";
import "./buttons.js";
import { projects, Project, ToDo } from "./app";

const defaultProject = new Project("Default Project", [
  new ToDo("Chores", "Wash the Dishes", new Date(2023, 8, 29), 3)
]);