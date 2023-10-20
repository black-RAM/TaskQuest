// menu-related code in IIFE
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

function toggleMenuIconAndSetMainHeight() {
  // hide menu, show icon on mobile
  if (window.innerWidth < 575) {
    menu.classList.add("d-none");
    menu.classList.add("position-absolute")
    menuIcon.classList.remove("d-none")
  } else {
    menu.classList.remove("d-none");
    menu.classList.remove("position-absolute")
    menuIcon.classList.add("d-none")
  }

  // set main height to remaining VH under header
  const hgroupHeight = document.querySelector("hgroup").offsetHeight;
  const availableHeight = window.innerHeight - (hgroupHeight + 30);
  document.querySelector("main").style.minHeight = availableHeight + "px";
  document.querySelector("nav").style.minHeight = availableHeight + "px";
}

// Add an event listener to check screen width when the page loads and on resize
window.addEventListener('load', toggleMenuIconAndSetMainHeight);
window.addEventListener('resize', toggleMenuIconAndSetMainHeight);

// show/collapse menu when icon clicked
menuIcon.addEventListener('click', () => {
  menu.classList.toggle("d-none");
});