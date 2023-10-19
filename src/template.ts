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
  const dueDateP = document.createElement("p");

  // attributes
  checkBox.type = "checkbox";
  checkBox.id = "completeCheck";
  toDoTitle.htmlFor = "completeCheck";
  dueDateP.classList.add("due-date");

  editButton.type = "button";
  deleteButton.type = "button";
  detailsButton.type = "button";

  editButton.title = "edit";
  deleteButton.title = "delete";
  detailsButton.classList.add("btn-outline-secondary");

  detailsButton.innerText = "Details";
  editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
  deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

  // finally, adding content to the DOM
  toDoTitle.innerText = toDo.title;

  leftDiv.appendChild(checkBox)
  leftDiv.appendChild(toDoTitle)

  dueDateP.innerText = "1 Jan";
  rightDiv.appendChild(dueDateP);
  rightDiv.appendChild(detailsButton);
  rightDiv.appendChild(editButton);
  rightDiv.appendChild(deleteButton)

  element.appendChild(leftDiv);
  element.appendChild(rightDiv);

  document.querySelector("section.to-do-page")?.appendChild(element);

}

export { renderProject }