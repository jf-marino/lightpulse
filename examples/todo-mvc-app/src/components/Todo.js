import { Actions } from 'lightpulse'
import { h } from 'snabbdom/h'

/**
 * Todo item component.
 * @param props - Observable
 */
export const Todo = ({props}) => {
  const {stream, handlers} = Actions({
    onClick: (ev, todo) => ({type: 'toggle', payload: todo})
  })

  return {
    Events: stream,
    DOM: props.map(({title, completed}) => (
      h('li', {class: {completed}}, [
        h('input', {
          on: {click: (ev) => handlers.onClick(ev, {title, completed})},
          attrs: {type: 'checkbox'},
          class: {toggle: true}
        }),
        h('label', title)
      ])
    ))
  }
}
