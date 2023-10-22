import { ToDo } from "./app";

function noFilter(todos: ToDo[]) {
  return todos.filter(todo => true)
}

function filterImportant(todos: ToDo[]) {
  return todos.filter(todo => todo.priorityNum === 3);
};

function filterThisWeek(todos: ToDo[]) {
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  return todos.filter((todo) => todo.due >= today && todo.due <= endOfWeek);
};

function filterToday(todos: ToDo[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time part to midnight

  return todos.filter(todo => {
    const todoDue = todo.due
    todoDue.setHours(0, 0, 0, 0);

    return todoDue.getTime() == today.getTime();
  });
}

export { filterImportant, filterThisWeek, filterToday, noFilter }