import {h, Component} from 'composi'
import {uuid} from '../utils/uuid'
import {ListItem} from './list-item'
import {Footer} from './footer'

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
              <ListItem {...{props: this, item}}/>
            ))
          }
        </ul>
        <Footer props={this} />
      </div>
    )
  }
  componentDidMount() {
    this.input = this.element.querySelector('input')
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
    const value = this.input.value
    if (value) {
      this.setState(prevState => {
        prevState.push({active: true, value, id: uuid()})
        return prevState
      })
      localStorage.setItem('todo-list', JSON.stringify(this.state))
      this.input.value = ''
    } else {
      alert('Please provide a todo to add!')
    }
  }
  getAllListItems() {
    return Array.prototype.slice.call(this.element.querySelectorAll('li'))
  }
}
