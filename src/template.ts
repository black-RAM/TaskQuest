import { Project, ToDo } from "./app";
import { pubSub } from "./pubsub";
import { format } from 'date-fns';

const projectContainer = document.createElement("section");
projectContainer.classList.add("to-do-page");

function renderProject(project: Project) {

  const heading = document.createElement("header");
  const title = document.createElement("h2");
  title.innerText = project.name;
  const icon = document.createElement("i");
  icon.classList.add("bi");
  icon.classList.add(`${project.icon}`);

  heading.appendChild(icon)
  heading.appendChild(title)

  projectContainer.appendChild(heading)

  for (const toDo of project.todos) {
    renderToDo(toDo);
  }

  document.getElementsByTagName("main")[0].appendChild(projectContainer);
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
  element.classList.add(
    toDo.priority === 1 ? "priority-low" :
      toDo.priority === 2 ? "priority-medium" :
        "priority-high"
  )
  rightDiv.id = `${toDo.title}-btn-div`.toLocaleLowerCase().replace(' ', '-')
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

  dueDateP.innerText = format(toDo.due, "d LLL");
  rightDiv.appendChild(dueDateP);
  rightDiv.appendChild(detailsButton);
  rightDiv.appendChild(editButton);
  rightDiv.appendChild(deleteButton)

  element.appendChild(leftDiv);
  element.appendChild(rightDiv);

  projectContainer.appendChild(element);

}

pubSub.subscribe("todo-added", renderToDo);

export { renderProject }