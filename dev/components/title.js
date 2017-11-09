import {h, Component} from 'composi'

export const title = new Component({
  container: 'header',
  render: (title) => {
    return (
      <nav>
        <h1>{title}</h1>
      </nav>
    )
  }
})
