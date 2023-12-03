import { format } from "date-fns";
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

  // close modal if user clicks away
  document.body.addEventListener("click", function (event) {
    event.preventDefault()
    if (modal instanceof HTMLDialogElement && event.target instanceof Node) {
      if (!(modal.contains(event.target) || icon?.contains(event.target))) {
        modal.close()
      }
    }
  })
}

addProjectForm()

function toDoForm(container: HTMLElement, position: DOMRect, formAction: FormActionFunction, isEditForm = false) {
  if (document.getElementsByClassName("to-do-form")[0]) return // prevent duplicates

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
  const priorityText = document.createElement("span")
  const priorityBtn1 = document.createElement("button")
  const priorityBtn2 = document.createElement("button")
  const priorityBtn3 = document.createElement("button")
  const submitGroup = document.createElement("div")
  const submit = document.createElement("button")
  const cancel = document.createElement("button")

  // text content
  titleText.innerText = "Title: "
  detailsText.innerText = "Details: "
  dateText.innerText = "Date: "
  priorityText.innerText = "Priority: "
  priorityBtn1.innerText = "low"
  priorityBtn2.innerText = "med"
  priorityBtn3.innerText = "high"
  submit.innerText = "Add"
  cancel.innerText = "Cancel"

  // attributes
  form.classList.add("to-do-form")
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

  if(isEditForm){
    // priority group div has no gap in SCSS, so buttons do not overflow
    priorityGroup.classList.add("priority-group") 
  }
  priorityBtn1.type = "button"
  priorityBtn2.type = "button"
  priorityBtn3.type = "button"
  priorityBtn1.title = "low priority"
  priorityBtn2.title = "medium priority"
  priorityBtn3.title = "high priority"
  priorityBtn1.classList.add("bg-success-subtle")
  priorityBtn2.classList.add("bg-warning-subtle")
  priorityBtn3.classList.add("bg-danger-subtle")

  submit.type = "submit"
  submitGroup.classList.add("submit-group")

  cancel.type = "reset"

  // priority number input
  let priority = 1
  priorityBtn1.addEventListener("click", () => {
    priority = 1
  })
  priorityBtn2.addEventListener("click", () => {
    priority = 2
  })
  priorityBtn3.addEventListener("click", () => {
    priority = 3
  })

  // simply close form on cancel
  cancel.addEventListener("click", () => {
    container.removeChild(modal)
  })

  // run necessary action when submitted
  form.addEventListener("submit", () => {
    formAction(titleInput.value, detailsInput.value, dateInput.value, priority)
    container.removeChild(modal)
  })

  // adding to DOM
  titleGroup.appendChild(titleText)
  titleGroup.appendChild(titleInput)

  detailsGroup.appendChild(detailsText)
  detailsGroup.appendChild(detailsInput)

  dateGroup.appendChild(dateText)
  dateGroup.appendChild(dateInput)

  priorityGroup.appendChild(priorityText)
  priorityGroup.appendChild(priorityBtn1)
  priorityGroup.append(priorityBtn2)
  priorityGroup.append(priorityBtn3)

  submitGroup.appendChild(submit)
  submitGroup.appendChild(cancel)

  form.appendChild(titleGroup)
  form.appendChild(detailsGroup)
  form.appendChild(dateGroup)
  form.appendChild(priorityGroup)
  form.appendChild(submitGroup)

  modal.appendChild(form)
  container.appendChild(modal)
  modal.showModal()

  // position modal
  const positionTooLow = window.innerHeight / 2 + 100 < position.bottom

  if(positionTooLow) {
    modal.style.top = `${position.top - modal.clientHeight - 15}px`
  } else {
    modal.style.top = `${position.bottom}px`
  }
  modal.style.left = `${position.left}px`
  modal.style.right = '1.5rem'
  modal.classList.add("mt-0")

  return { titleInput, detailsInput, dateInput, submit }
}

function addToDoForm(project: Project, container: HTMLElement, coordinates: DOMRect) {

  // create ToDo from user input
  function createToDo(title: string, details: string, dateString: string, priority: number) {
    const newToDo = new ToDo(title, details, new Date(dateString), priority)
    project.addToDo(newToDo)
  }

  // hand over creation of form to lower-level function toDoForm()
  toDoForm(container, coordinates, createToDo)
}

function editToDoForm(toDo: ToDo, container: HTMLElement, coordinates: DOMRect) {
  const elements = toDoForm(container, coordinates, editDetails, true)

  // include the text of previous todo details
  if (elements) {
    elements.titleInput.value = toDo.title
    elements.detailsInput.value = toDo.description
    elements.dateInput.value = format(toDo.due, "yyyy-MM-dd")
    elements.submit.innerText = "Edit"
  }

  function editDetails(title: string, details: string, dateString: string, priority: number) {
    toDo.updateProperties(title, details, new Date(dateString), priority)
  }
}

interface FormActionFunction {
  (title: string, details: string, dateString: string, priority: number): void;
}

export { addToDoForm, editToDoForm }