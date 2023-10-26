import { Category, Project, ToDo } from "./app";
import { pubSub } from "./pubsub";
import { format } from 'date-fns';

const projectContainer = document.createElement("section");
projectContainer.classList.add("to-do-page");
let projectInstance = 0;

function addProject(project: Project | Category) {
  // show all tasks on startup
  if (project.name === "All Tasks") {
    setTimeout(() => {
      renderProject(project)
    }, 10); // 10ms delay to allow all to-dos to initialise
  };

  const type = project instanceof Project ? "project" : "category";
  const projectList = document.getElementById(`${type}-list`);
  const listElement = document.createElement("li");
  const listText = document.createElement("p")
  const toDoCounter = document.createElement("span")
  toDoCounter.innerText = "0";

  listText.appendChild(toDoCounter)
  listText.innerHTML += project.name
  listElement.appendChild(listText)

  if (project instanceof Project) {
    const icon = document.createElement("i")
    icon.classList.add("bi-three-dots-vertical")
    listElement.appendChild(icon)
    listElement.dataset.index = String(projectInstance)
    projectInstance += 1;
  }

  listText.addEventListener("click", () => {
    clearPage()
    renderProject(project)
  })
  projectList?.appendChild(listElement)
}

function renderProject(project: Project | Category) {

  const heading = document.createElement("header");
  const title = document.createElement("h2");
  title.innerText = project.name;
  const icon = document.createElement("i");
  icon.classList.add("bi");
  icon.classList.add(`${project.icon}`);

  heading.appendChild(icon)
  heading.appendChild(title)

  projectContainer.appendChild(heading)

  document.getElementsByTagName("main")[0].appendChild(projectContainer);

  if (project instanceof Project && project.initialTodos) {
    for (const todo of project.initialTodos) {
      project.addToDo(todo)
    }

    project.initialTodos = undefined;
  } else {
    project.todos.forEach((todo, i) => {
      renderToDo([todo, i, project]);
    });
  }
}

function renderToDo(parameters: [toDo: ToDo, index: Number, project: Project | Category]) {
  // spread parameters of tuple
  const toDo = parameters[0];
  const index = parameters[1];
  const project = parameters[2]
  const isProject = project instanceof Project;

  // HTML elements for to-do article
  const element = document.createElement("article");
  const leftDiv = document.createElement("div");
  const rightDiv = document.createElement("div");
  const checkBox = document.createElement("input");
  const toDoTitle = document.createElement("label");
  const dueDateP = document.createElement("p");
  const detailsButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const detailsModal = document.createElement("dialog");
  const closeDetailsModal = document.createElement("button");

  // attributes
  element.classList.add(`priority-${toDo.priority}`);
  checkBox.type = "checkbox";
  checkBox.id = "completeCheck";
  toDoTitle.htmlFor = "completeCheck";
  dueDateP.classList.add("due-date");

  editButton.type = "button";
  deleteButton.type = "button";
  detailsButton.type = "button";
  closeDetailsModal.type = "button";

  editButton.title = "edit";
  deleteButton.title = "delete";
  detailsButton.classList.add("btn-outline-secondary");
  detailsModal.classList.add("details")
  closeDetailsModal.classList.add("close-details")

  // content
  toDoTitle.innerText = toDo.title;
  dueDateP.innerText = format(toDo.due, "d LLL");
  detailsButton.innerText = "Details";
  editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
  deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
  closeDetailsModal.innerHTML = '<i class="bi bi-x-square"></i>'
  detailsModal.innerHTML =
    `<h3>${toDo.title}</h3>
    <p><b>Project:</b> ${toDo.projectName}</p>
    <p><b>Priority:</b> ${toDo.priority}</p>
    <p><b>Description:</b> ${toDo.description}</p>
    <p><b>Due Date:</b> ${format(toDo.due, "do MMMM, Y")}</p>`;

  // details button
  detailsButton.addEventListener("click", () => {
    // position modal under to-do element
    const buttonPos = detailsButton.getBoundingClientRect()
    detailsModal.style.top = `${Math.round(buttonPos.top) + 50}px`
    detailsModal.showModal()
  })

  closeDetailsModal.addEventListener("click", () => {
    detailsModal.close()
  })

  // finally, appending elements to the DOM
  detailsModal.appendChild(closeDetailsModal)

  leftDiv.appendChild(checkBox)
  leftDiv.appendChild(toDoTitle)

  rightDiv.appendChild(dueDateP)
  rightDiv.appendChild(detailsButton)
  rightDiv.appendChild(detailsModal)

  if (isProject) {
    rightDiv.appendChild(editButton)
    rightDiv.appendChild(deleteButton)
    element.dataset.index = String(index);
    // delete button
    deleteButton.addEventListener("click", () => {
      project.deleteToDo(toDo)
    })
  }

  element.appendChild(leftDiv);
  element.appendChild(rightDiv);

  projectContainer.appendChild(element);

}

function clearPage() {
  projectContainer.innerHTML = ""
}

function removeToDo(index: Number) {
  const deletion = document.querySelector(`article[data-index="${index}"]`)
  if (deletion) projectContainer.removeChild(deletion);
}

function removeProject(index: Number) {
  const deletedLI = document.querySelector(`li[data-index="${index}"]`)
  if (deletedLI) document.getElementById("project-list")?.removeChild(deletedLI)
}

pubSub.subscribe("todo-added", renderToDo);
pubSub.subscribe("todo-deleted", removeToDo)
pubSub.subscribe("project-deleted", removeProject)

export { addProject }