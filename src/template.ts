import { Project, ToDo } from "./app";

function renderProject(project: Project) {
  for (const toDo of project.todos) {
    renderToDo(toDo);
  }
}

function renderToDo(toDo: ToDo) {
  console.log(`to-do title: ${toDo.title};\ndescription: ${toDo.description}`);

  // HTML elements for to-do article
  const element = document.createElement("article");
  const leftDiv = document.createElement("div");
  const rightDiv = document.createElement("div");
  const checkBox = document.createElement("input");
  const toDoTitle = document.createElement("label");
  const detailsButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

}

export { renderProject }