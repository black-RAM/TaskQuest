import introJs from "intro.js";
import { IntroJs } from "intro.js/src/intro";

interface elementDictionary {
  [name: string]: {
    get: () => HTMLElement | null,
    stagehand: boolean,
    changer: boolean,
    isVisible: () => boolean
  }
}

const e: elementDictionary = (() => {
  const stepElement = (get: () => HTMLElement | null, stagehand = false, changer = false) => {
    const isVisible = () => !get()?.classList.contains("d-none")
    return {get, stagehand, changer, isVisible}
  }

  const banner = stepElement(() => document.getElementsByTagName("h2")[0])
  
  const toDoArticle = stepElement(() => document.getElementsByTagName("article")[1], false, true)
  const toDoArticle1 = stepElement(() => document.getElementsByTagName("article")[0], false, true)
  const toDoArticle2 = stepElement(() => document.getElementsByTagName("article")[2], false, true)

  const menuIcon = stepElement(() => document.querySelector<HTMLElement>("i.bi-list"), false, true)
  const navBar = stepElement(() => document.getElementsByTagName("nav")[0])
  const tourButton = stepElement(() => document.querySelector<HTMLButtonElement>("button[title='create tour']"))
  const category = stepElement(() => document.querySelectorAll<HTMLLIElement>("#category-list > li")[1])
  const projectHeader = stepElement(() => document.getElementById("project-header"))
  const projectLink = stepElement(() => {
    const link = document.querySelectorAll<HTMLElement>("#project-list > li > p")[0]

    if(menuIcon.isVisible() && navBar.isVisible()) {
      navBar.get()?.addEventListener("click", () => {
        navBar.get()?.classList.add("d-none")
      })
    }
    
    return link
  }, true)

  const addToDoIcon = stepElement(() => document.querySelector<HTMLElement>("i.bi-journal-plus"))
  const gameIcon = stepElement(() => document.getElementById("game-icon"), true)
  
  const gameImg = stepElement(() => document.getElementsByTagName("img")[0])

  return { banner, toDoArticle, toDoArticle1, toDoArticle2, menuIcon, navBar, tourButton, category, projectHeader, projectLink, addToDoIcon, gameIcon, gameImg }
})()

async function renderWalkthrough() {

  const stages: (() => Promise<IntroJs>)[] = [
    () => introJs().setOptions({
      steps: [
        {
          title: "TaskQuest Ahoy!",
          intro: "It's fun. It's simple. Meet the only to-do app you'll ever need!",
        },
        {
          element: e.banner.get(),
          title: "Define: category",
          intro: "This is a group which filters to-dos. Since this one is <b>'All Tasks'</b> it includes everything.",
          position: "right"
        },
        {
          element: e.toDoArticle.get(),
          title: "A To-Do Element",
          intro: "Get a glance of the title and details. Tap the title to tick it off!"
        },
        {
          element: e.menuIcon.isVisible() ? e.menuIcon.get() : e.navBar.get(),
          title: "The menu",
          intro: e.menuIcon.isVisible() ? "Click the icon to discover even more!" : "This is just the place to navigate the different app pages!",
        },
        {
          element: e.tourButton.get(),
          title: "A Quick Reminder",
          intro: "By default, this tour will not show on your second visit. Ever need it again? Just tap this button."
        },
        {
          element: e.category.get(),
          title: "Example category",
          intro: "This is a category that filters to-dos by priority, storing only high-priority ones."
        },
        {
          element: e.projectHeader.get(),
          title: "About Projects",
          intro: "These are the groups of to-dos that you make. Later, you could click the plus icon to add your own!"
        },
        {
          element: e.projectLink.get(),
          title: "A Perfect Example",
          intro: "Look into this project I made just for you! <small>(Select done and then you can open the page.)</small>"
        }
      ],
      showBullets: false,
      showProgress: true,
      }).start(),

    () => introJs().setOptions({
      steps: [
        {
          element: e.banner.get(),
          intro: "Welcome to the project page!",
        },
        {
          element: e.addToDoIcon.get(),
          title: "Adding to-dos",
          intro: "This button opens a form to add your new to-dos.",
          position: "left"
        },
        {
          element: e.toDoArticle.get(),
          title: "More powerful to-dos",
          intro: "A to-do element within a product page also has buttons to edit / delete it."
        },
        {
          element: e.toDoArticle2.get(),
          title: "Want to move?",
          intro: "Just drag a to-do element and drop it on a project link in the menu. <i>Only works on wider screens.</i>"
        },
        {
          element: e.toDoArticle1.get(),
          title: "The Easter Egg",
          intro: "Check this to-do then delete it... You just earned some coins!"
        },
        {
          element: e.gameIcon.get(),
          title: "A little reward",
          intro: "Great job getting this far. Spend your hard-earned money at the game panel!",
          position: "left"
        },
      ],
    }).start(),

    () => introJs().setOptions({
      steps: [
        {
          element: e.toDoArticle1.get(), // both to-dos and game cards use the <article> element
          title: "Work hard! Play hard!",
          intro: "Using those coins you earn from completing to-dos, you can pay for a 10-minute game session!",
        },
        {
          element: e.gameImg.get(),
          title: "Game time.",
          intro: "Click the game icon to play! Enjoy the game, and the productivity gains!",
          position: "right"
        },
        {
          title: "By-the-way",
          intro: "You can download this as an app with offline access. <i>Just look in the searchbar.</i>"
        },
      ],
      showBullets: false,
      showStepNumbers: true,
      }).start(),
  ]

  let stageIndex = 0

  // display stage one
  let currentStage = stages[stageIndex]()

  // set up stage-changers
  for (const name in e) {
    const tour = await currentStage
    const element = e[name]
    const DOMElement = element.get()
    let action: (() => void) | null = null;
    
    if(element.stagehand) {
      action = () => {currentStage = stages[++stageIndex]()}
    } else if (element.changer) {
      action = () => {setTimeout(() => {tour.nextStep()}, 500);}
    }

    if(DOMElement && tour.isActive() && action) {
      DOMElement.addEventListener("click", action, {once: true})
    }
  }
}

// attach this function to tour button
document.querySelector('button[title="create tour"]')?.addEventListener("click", () => {

  if(e.menuIcon.isVisible() && e.navBar.isVisible()) { // as in mobile screen
    e.navBar.get()?.classList.add("d-none") // hide menu when clicked
  }
  
  renderWalkthrough()
})

export { renderWalkthrough }