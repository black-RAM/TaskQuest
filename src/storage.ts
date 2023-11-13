import { Project, ToDo } from "./app";
import { pubSub } from "./pubsub";

function populateInitialProjects() {
  new Project("Goals", [
    new ToDo("New Year", "Write my new year's day resolutions", new Date(2024, 1, 1), 3),
    new ToDo("Coding", "Finish the Odin Project", new Date(2023, 8, 29), 3),
    new ToDo("Gym", "Bench press my body weight", new Date(2024, 11, 31), 2)
  ], "bi-bullseye");

  new Project("Chill", [
    new ToDo("Netflix", "Binge that new series", new Date(2023, 9, 22), 1),
    new ToDo("Painting", "Relax with watercolor", new Date(2023, 9, 24), 1),
  ], "bi-tv-fill")
}

function setVisitedCookie() {
  const expiration = new Date()
  expiration.setFullYear(expiration.getFullYear() + 1)
  document.cookie = `visited=true; expires=${expiration.toUTCString}; SameSite=strict;`
}

function hasVisited() {
  return document.cookie.split('; ').some(cookie => cookie.startsWith('visited='));
}

function storeData(projects: Project[]) {
  localStorage.setItem("projects", JSON.stringify(projects))
}

function loadData(): Project[] {
  const projectsJSON = localStorage.getItem("projects")
  const projectsData: Project[] = projectsJSON ? JSON.parse(projectsJSON) : []
  const loadedProjects: Project[] = []

  for (const project of projectsData) {
    const loadedProject = new Project(project.name, undefined, project.icon)

    if (project.initialTodos) {
      for (const initial of project.initialTodos) {
        loadedProject.addToDo(
          new ToDo(initial.title, initial.description, new Date(initial.due), initial.priorityNum)
        )
      }
    }

    for (const todo of project.todos) {
      loadedProject.addToDo(
        new ToDo(todo.title, todo.description, new Date(todo.due), todo.priorityNum)
      )
    }

    loadedProjects.push(
      loadedProject
    )
  }

  return loadedProjects
}

// Function to clear the "has visited" cookie: for test purposes
function clearVisitedCookie() {
  const pastDate = new Date(0); // Set the date to a past time (Unix epoch)
  document.cookie = `visited=true; expires=${pastDate.toUTCString()}; path=/`;
}

pubSub.subscribe("data-change", storeData)

export { setVisitedCookie, hasVisited, storeData, loadData, populateInitialProjects, clearVisitedCookie }