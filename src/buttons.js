// menu-related code in IIFE
(function () {
  const menuIcon = document.getElementById("menu-icon");
  const menu = document.getElementById("menu");

  // hide menu on screens under 575px
  function checkScreenWidth() {
    if (window.innerWidth < 575) {
      menu.classList.add("d-none");
      menu.classList.add("position-absolute")
    } else {
      menu.classList.remove("d-none");
      menu.classList.remove("position-absolute")
    }
  }

  // Add an event listener to check screen width when the page loads and on resize
  window.addEventListener('load', checkScreenWidth);
  window.addEventListener('resize', checkScreenWidth);

  // Toggle the menu when clicking the menu icon
  menuIcon.addEventListener('click', () => {
    menu.classList.toggle("d-none");
  });
})();

// main takes up vh under header
(function () {
  // Calculate and set the height of the main section
  function setMainSectionHeight() {
    const hgroupHeight = document.querySelector("hgroup").offsetHeight;
    const availableHeight = window.innerHeight - (hgroupHeight + 30);
    document.querySelector("main").style.minHeight = availableHeight + "px";
  }

  // Add an event listener to update the main section height when the page loads and on resize
  window.addEventListener('load', setMainSectionHeight);
  window.addEventListener('resize', setMainSectionHeight);
})();
