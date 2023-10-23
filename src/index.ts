import "./style.scss";
import "./resizer.js";
import { Project, ToDo } from "./app";

new Project("Goals", [
  new ToDo("Coding", "Finish the Odin Project", new Date(2023, 8, 29), 1),
  new ToDo("Studying", "Revise for the upcoming exams", new Date(2023, 10, 1), 3),
  new ToDo("Gym", "Deadlift 40kg", new Date(2023, 9, 21), 2)
], "bi-bullseye");

new Project("Chill", [
  new ToDo("Netflix", "Binge that new series", new Date(2023, 9, 22), 1),
  new ToDo("Painting", "Relax with watercolor", new Date(2023, 9, 24), 1)
], "bi-tv-fill")