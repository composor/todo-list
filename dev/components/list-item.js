import {h, Component} from 'composi'

// List Item Component:
export function ListItem({props, item}) {
  return (
    <li class={item.active ? 'active' : ''} data-id={item.id}>
      <button class='set-state' onclick={props.setActiveState}>
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="selection-indicator"><path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#007AFF" stroke-width="2"></path></g></g></svg>
      </button>
      <h3>{item.value}</h3>
      <button class="delete" onclick={props.deleteItem}>
        X</button>
    </li>
  )
}
