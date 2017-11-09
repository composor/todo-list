export function loadFromLocalStorage() {
  // Get data from localStorage
  let todos = localStorage.getItem('todo-list')
  return JSON.parse(todos)
}
