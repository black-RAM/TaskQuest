import { Project, ToDo } from "./app";

function addProjectForm() {
  const navBar = document.getElementsByTagName("nav")[0];
  const icon = document.getElementById("add-project-icon");
  const modal = document.querySelector("dialog#project-form-container");
  const form = document.getElementById("add-project-form")
  const nameField = document.getElementById("project-name")

  if (icon) icon.addEventListener("click", () => {
    if (modal instanceof HTMLDialogElement) {
      // Get the position of the parent element (the header)
      const iconTop = icon.parentElement?.getBoundingClientRect().top;

      // Set the position of the dialog
      if (iconTop) modal.style.top = `${iconTop - 20}px`;
      modal.style.left = `${navBar?.clientWidth - 35}px`;

      modal.show();
    }
  })

  if (form instanceof HTMLFormElement) form.addEventListener("submit", () => {
    if (nameField instanceof HTMLInputElement) new Project(nameField.value)
  })
}

addProjectForm()

function addToDoForm(project: Project, container: HTMLElement, coordinates: DOMRect) {
  // HTML element creation
  const modal = document.createElement("dialog")
  const form = document.createElement("form")
  const titleGroup = document.createElement("div")
  const titleText = document.createElement("label")
  const titleInput = document.createElement("input")
  const detailsGroup = document.createElement("div")
  const detailsText = document.createElement("label")
  const detailsInput = document.createElement("input")
  const dateGroup = document.createElement("div")
  const dateText = document.createElement("label")
  const dateInput = document.createElement("input")
  const priorityGroup = document.createElement("div")
  const priorityText = document.createElement("label")
  const priorityInput = document.createElement("input")
  const submitGroup = document.createElement("div")
  const submit = document.createElement("button")
  const cancel = document.createElement("button")

  // text content
  titleText.innerText = "Title: "
  detailsText.innerText = "Details: "
  dateText.innerText = "Date: "
  priorityText.innerText = "Priority (scale of 1-3): "
  submit.innerText = "Add"
  cancel.innerText = "Cancel"

  // attributes
  form.method = "dialog"

  titleInput.required = true
  titleInput.id = "title"
  titleText.htmlFor = "title"

  detailsInput.id = "details"
  detailsText.htmlFor = "details"

  dateInput.required = true
  dateInput.id = "date"
  dateText.htmlFor = "date"
  dateInput.type = "date"

  priorityInput.required = true
  priorityInput.type = "number"
  priorityInput.min = "1"
  priorityInput.max = "3"

  submit.type = "submit"

  // adding to DOM
  titleGroup.appendChild(titleText)
  titleGroup.appendChild(titleInput)

  detailsGroup.appendChild(detailsText)
  detailsGroup.appendChild(detailsInput)

  dateGroup.appendChild(dateText)
  dateGroup.appendChild(dateInput)

  priorityGroup.appendChild(priorityText)
  priorityGroup.appendChild(priorityInput)

  submitGroup.appendChild(submit)
  submitGroup.appendChild(cancel)

  modal.appendChild(titleGroup)
  modal.appendChild(detailsGroup)
  modal.appendChild(dateGroup)
  modal.appendChild(priorityGroup)
  modal.appendChild(submitGroup)

  container.appendChild(modal)

  // position modal
  modal.style.top = `${coordinates.bottom}px`
  modal.style.left = `${coordinates.left}px`
  modal.style.right = '1.5rem'
  modal.show()

  // create ToDo from user input
  submit.addEventListener("click", () => {
    const newToDo = new ToDo(titleInput.value, detailsInput.value, new Date(dateInput.value), +priorityInput.value)
    project.addToDo(newToDo)
    modal.close()
  })

  // simply close form on cancel
  cancel.addEventListener("click", () => {
    modal.close()
  })
}

export { addToDoForm }