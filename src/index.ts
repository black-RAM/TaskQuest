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
  new ToDo("Web Authoring", "Try and hand it in", new Date(2023, 9, 31), 3),
  new ToDo("Literature", "Read Act IV and do the activity", new Date(2023, 10, 7), 1),
  new ToDo("Bible", "Read Joshua and do the weekly readings", new Date(2023, 10, 30), 1),
  new ToDo("Geography", "Notes about case studies of rivers", new Date(2023, 9, 31), 3),
  new ToDo("Business Studies", "Notes on chapter 5", new Date(2023, 10, 1), 3),
  new ToDo("French", "Revise French", new Date(2023, 10, 1), 1),
  new ToDo("Chemistry", "Practice Chemical calculations", new Date(2023, 10, 2), 1)
])