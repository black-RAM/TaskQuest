import "./style.scss";
import "./resizer.js";
import { Project, ToDo } from "./app";

const goals = new Project("Goals", [
  new ToDo("Coding", "Finish the Odin Project", new Date(2023, 8, 29), 1),
  new ToDo("Studying", "Revise for the upcoming exams", new Date(2023, 10, 1), 3),
  new ToDo("Gym", "Deadlift 40kg", new Date(2023, 9, 21), 2)
], "bi-bullseye");

const chill = new Project("Chill", [
  new ToDo("Netflix", "Binge that new series", new Date(2023, 9, 22), 1),
  new ToDo("Painting", "Relax with watercolor", new Date(2023, 9, 24), 1),
  new ToDo("Gifting", "Do art for Dad", new Date(2023, 10, 11), 3)
], "bi-tv-fill")

const homework = new Project("Homework", [
  new ToDo("Math Revision", "Ex. 11.13, revise quadratic equation and quadratic formula", new Date(2023, 10, 2), 3),
  new ToDo("English Coursework", "My most prized possesion", new Date(2023, 10, 1), 1),
  new ToDo("History Arguement", "Bring up mark scheme issue", new Date(2023, 10, 1), 3),
  new ToDo("Literature", "Read Act IV and do the activity", new Date(2023, 10, 7), 1),
  new ToDo("History 1", "Some two essays...", new Date(2023, 10, 7), 1),
  new ToDo("History 2", "Work on google classroom", new Date(2023, 10, 13), 1),
  new ToDo("Bible", "Read Joshua and do the weekly readings", new Date(2023, 10, 30), 1),
])