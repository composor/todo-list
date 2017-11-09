import {h, Component} from 'composi'
import {title} from './components/title'
import {TodoList} from './components/todo-list'
import {uuid} from './utils/uuid'
import {loadFromLocalStorage} from './utils/localStorage'


title.state = 'Composi Todo List'

// Instantiate list with default todos:
const list = new TodoList({
  container: 'section',
  state: [{active: true, value: 'Take a nap', id: uuid()}, {active: false, value: 'Eat a snack', id: uuid()}, {active: true, value: 'Talk with Mom', id: uuid()}]
})

// When DOM is ready, check for todos stored in localStorage.
// If they exist, use them to render list.
// Otherwise use default list state.
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const data = loadFromLocalStorage()
    if (data && data.length) {
      list.state = data
    } else {
      list.update()
    }
  })
})
