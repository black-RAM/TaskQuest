import "./style.scss";
import "./resizer.js";
import { Project, ToDo } from "./app";

const defaultProject = new Project("Goals", [
  new ToDo("Coding", "Finish the Odin Project", new Date(2023, 8, 29), 1),
  new ToDo("Gym", "Deadlift 80kg", new Date(2023, 9, 10), 2),
  new ToDo("Studying", "Revise for the upcoming exams", new Date(2023, 10, 1), 3)
]);

const project2 = new Project("Chill", [
  new ToDo("Netflix", "Binge that new series", new Date(2023, 11, 5), 1)
])