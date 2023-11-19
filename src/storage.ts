import { Project, ToDo } from "./app";
import { pubSub } from "./pubsub";

function populateInitialProjects() {
  // date for week to-do
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const randomDate = new Date(
    today.getTime() + Math.random() * (endOfWeek.getTime() - today.getTime())
  );

  new Project("Tutorial", [
    new ToDo("Important task", "This has a priority number of 3 (the highest). Notice the red border color-coding.", new Date(2023, 11, 31), 3),
    new ToDo("Nice-to-do task", "This is something of medium importance. It has a priority number of 2. It's color-coded green", new Date(2023, 11, 31), 2),
    new ToDo("Just for fun", "This is not important. It's priority number is one (the lowest). It's flagged as green.", new Date(2023, 11, 31), 1),
    new ToDo("Finish today", "Here is a to-do that is due today!", today, 3),
    new ToDo("Week's work", "This is something you just need to do sometime this week.", randomDate, 2),
  ])

  new Project("Sample", [
    new ToDo("New Year", "Write my new year's day resolutions", new Date(2024, 0, 1), 1),
    new ToDo("Coding", "Finish creating the TaskQuest app", new Date(2023, 8, 29), 3),
    new ToDo("Gym", "Bench press my body weight", new Date(2024, 11, 31), 2)
  ]);
}

function setVisitedFlag() {
  localStorage.setItem('visited', 'true');
}

function hasVisited() {
  return localStorage.getItem('visited') === 'true';
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

pubSub.subscribe("data-change", storeData)

export { setVisitedFlag, hasVisited, storeData, loadData, populateInitialProjects }