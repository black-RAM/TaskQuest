# TaskQuest App Features

- A project contains a list of various todos.
- Each project renders in its own different page.
- Navigate/add/delete projects pages (and even see their to-do counts) by using the sidebar (which is collapsable on mobile).
- Within the heading of the project page, there is an icon which opens the form to add a to-do.
- Each to-do element includes a checkbox, its title, the due date, a button to display more of its details, a button to edit it, and a button to delete it.

- Categories filter to-dos by a certain criteria. For example, the important category contains only to-dos with a priority number of 3.
- Categories, like projects, render in their own pages, which can be selected from the sidebar; but unlike projects, they cannot be added or deleted by the user.
- You cannot manually add a todo to a category, nor can you edit/delete a todo. You can only see its details.

- All project data is stored in the user's local storage, and loaded from the JSON when the user visits the app again.

# New! All about the games

- When you complete a to-do (by checking it and then deleting it) before the due date, you gain coins.
- But if you complete a to-do after the due date, you lose the coins you could have gained.
- At the game panel (which you can navigate to by clicking the game controller icon at the top right of the page), you can use the coins you have earned to pay for a ten-minute gaming session in any of the three games.
- Coins are also stored in local storage for continuity.
