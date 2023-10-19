import { Project, ToDo } from "./app";

function renderProject(project: Project) {
  for (const toDo of project.todos) {
    renderToDo(toDo);
  }
}

function renderToDo(toDo: ToDo) {
  console.log(`to-do title: ${toDo.title};\ndescription: ${toDo.description}`)
}

export { renderProject }