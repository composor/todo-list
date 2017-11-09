import {h, Component} from 'composi'
import {uuid} from '../utils/uuid'

// Define Todo List class:
export class TodoList extends Component {
  constructor(props) {
    super(props)
    this.setActiveState = this.setActiveState.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.itemsToShow = []
    this.showAll = this.showAll.bind(this)
    this.showActive = this.showActive.bind(this)
    this.showCompleted = this.showCompleted.bind(this)
    this.addItem = this.addItem.bind(this)
  }
  render(data) {
    const state = this.state
    this.itemsToShow = []
    state.map(item => {
      if (item.active === true) {
        this.itemsToShow.push(item)
      }
    })

    return (
      <div class="parent-view">
        <p class="add-todo">
          <input type="text"/>
          <button class='addItem' onclick={this.addItem}>Add Item</button>
        </p>
        <ul class='todo-list'>
          {
            data.map(item => (
              <li class={item.active ? 'active' : ''} data-id={item.id}>
                <button class='set-state' onclick={this.setActiveState}>
                  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="selection-indicator"><path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#007AFF" stroke-width="2"></path></g></g></svg>
                </button>
                <h3>{item.value}</h3>
                <button class="delete" onclick={this.deleteItem}>
                  <svg width="20px" height="20px" viewBox="0 0 30 30" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Delete" stroke="#FF0000" stroke-width="2" stroke-linecap="square"><path d="M26.5,3.5 L3.5,26.5" id="Line"></path><path d="M3.5,3.5 L26.5,26.5" id="Line"></path></g></g></svg>
                </button>
              </li>
            ))
          }
        </ul>
        <footer>
          <div id="totals-view"><span>{this.itemsToShow.length > 1 ? `${this.itemsToShow.length} items` : `${this.itemsToShow.length} item`} left.</span></div>
          <p>Show: </p>
          <div id="show-todo-state">
            <button onclick={this.showAll} id="show-all" class="selected">All</button>
            <button onclick={this.showActive} id="show-active" class="">Active</button>
            <button onclick={this.showCompleted} id="show-completed" class="">Completed</button>
          </div>
        </footer>
      </div>
    )
  }
  setActiveState(e) {
    const id = e.target.closest('li').dataset.id
    let state = this.state
    const index = state.findIndex(item => item.id == id)
    state[index].active = !state[index].active
    this.setState(state)
    localStorage.setItem('todo-list', JSON.stringify(state))
  }
  deleteItem(e) {
    const id = e.target.closest('li').dataset.id
    let state = this.state
    const index = state.findIndex(item => item.id == id)
    state.splice(index, 1)
    this.setState(state)
    localStorage.setItem('todo-list', JSON.stringify(state))
  }
  showAll(e) {
    this.setSelectedStateOfButtons(e)
    const listItems = this.getAllListItems()
    listItems.map(item => item.classList.remove('hidden'))
  }
  showActive(e) {
    this.setSelectedStateOfButtons(e)
    const listItems = this.getAllListItems()
    this.state.map((item, idx) => {
      if (!item.active) listItems[idx].classList.add('hidden')
      else listItems[idx].classList.remove('hidden')
    })
  }
  showCompleted(e) {
    this.setSelectedStateOfButtons(e)
    const listItems = this.getAllListItems()
    this.state.map((item, idx) => {
      if (item.active) listItems[idx].classList.add('hidden')
      else listItems[idx].classList.remove('hidden')
    })
  }
  setSelectedStateOfButtons(e) {
    var button = e.target
    for (let i = 0; i < button.parentNode.children.length; i++) {
      button.parentNode.children[i].className = ''
    }
    button.className = 'selected'
  }
  addItem() {
    const input = this.element.querySelector('input')
    const value = input.value
    if (value) {
      this.setState({active: true, value, id: uuid()}, this.state.length)
      localStorage.setItem('todo-list', JSON.stringify(this.state))
    } else {
      alert('Please provide a todo to add!')
    }
  }
  getAllListItems() {
    return Array.prototype.slice.call(this.element.querySelectorAll('li'))
  }
}
