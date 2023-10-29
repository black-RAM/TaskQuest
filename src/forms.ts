import { Project } from "./app";

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
      if (iconTop) modal.style.top = `${iconTop + 20}px`;
      modal.style.left = `${navBar?.clientWidth - 35}px`;

      modal.show();
    }
  })

  if (form instanceof HTMLFormElement) form.addEventListener("submit", () => {
    if (nameField instanceof HTMLInputElement) new Project(nameField.value)
  })
}

addProjectForm()