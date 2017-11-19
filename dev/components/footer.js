import {h, Component} from 'composi'

// Footer Component:
export function Footer({props}) {
  return (
    <footer>
      <div id="totals-view"><span>{props.itemsToShow.length > 1 ? `${props.itemsToShow.length} items` : `${props.itemsToShow.length} item`} left.</span></div>
      <p>Show: </p>
      <div id="show-todo-state">
        <button onclick={props.showAll} id="show-all" class="selected">All</button>
        <button onclick={props.showActive} id="show-active" class="">Active</button>
        <button onclick={props.showCompleted} id="show-completed" class="">Completed</button>
      </div>
    </footer>
  )
}