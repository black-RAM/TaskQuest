import { Project, ToDo } from "./app";
import { pubSub } from "./pubsub";

function populateInitialProjects() {
  new Project("Goals", [
    new ToDo("Coding", "Finish the Odin Project", new Date(2023, 8, 29), 1),
    new ToDo("Gym", "Deadlift 40kg", new Date(2023, 9, 21), 2)
  ], "bi-bullseye");

  new Project("Chill", [
    new ToDo("Netflix", "Binge that new series", new Date(2023, 9, 22), 1),
    new ToDo("Painting", "Relax with watercolor", new Date(2023, 9, 24), 1),
    new ToDo("Gifting", "Do art for Dad", new Date(2023, 10, 11), 3)
  ], "bi-tv-fill")

  new Project("Homework", [
    new ToDo("History", "Work on google classroom", new Date(2023, 10, 13), 1),
    new ToDo("Bible", "Read Joshua and do the weekly readings", new Date(2023, 10, 30), 1),
  ])
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
    const initials: ToDo[] = []
    if (project.initialTodos) {
      for (const initial of project.initialTodos) {
        initials.push(
          new ToDo(initial.title, initial.description, new Date(), initial.priorityNum)
        )
      }
    }

    const loadedProject = new Project(project.name, initials, project.icon)

    for (const todo of project.todos) {
      loadedProject.addToDo(
        new ToDo(todo.title, todo.description, new Date(), todo.priorityNum)
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