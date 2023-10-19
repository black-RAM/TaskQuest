import "./style.scss";
import "./buttons.js";
import { projects, Project, ToDo } from "./app";

const defaultProject = new Project("All Tasks", [
  new ToDo("Chores", "Wash the Dishes", new Date(2023, 8, 29), 1),
  new ToDo("Gym", "Deadlift 80kg", new Date(2023, 9, 10), 2)
]);

defaultProject.addToDo(
  new ToDo("Exams", "Do French speaking", new Date(2023, 11, 5), 3)
)