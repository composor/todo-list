import { h } from 'composi'
import { ListItem } from './list-item'
import { Footer } from './footer'

export function List(props) {
  return (
    <div class="parent-view">
      <p class="add-todo">
        <input type="text" />
        <button class='addItem' onclick={props.addItem}>Add Item</button>
      </p>
      <ul class='todo-list'>
        {
          props.data.map(item => (
            <ListItem {...{ props: props.component, item }} />
          ))
        }
      </ul>
      <Footer props={props.component} />
    </div>
  )
}
