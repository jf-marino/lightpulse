import { Observable } from 'rxjs/Observable'
import { h } from 'snabbdom/h'
import { Todo } from './Todo'

import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/combineAll'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/concatMap'

export const TodoList = ({props}) => {
  // const { handlers } = Actions({ });
  const items = props.map(todos => todos.map(todo => {
    return Todo({props: Observable.of(todo)})
  }))

  const views = items.map(list => list.map(todo => todo.DOM))
    .concatMap(list => Observable.combineLatest(...list))
    .startWith([])

  // Return a stream of todos completion events
  /*
  ...list.map(todo =>
                              todo.Events.filter(({ type }) => type === 'toggle')
                                          .map(({ payload }) => ({ type: 'completed', payload })))
   */
  items.subscribe(list => console.log(list))
  items.do(list => list.map(todo => todo.Events).forEach(ev => ev.subscribe(e => console.log('event ', e)))).subscribe()

  const Completed =
    items.concatMap(list => {
      return Observable.merge(...(list.map(todo => todo.Events.do(() => console.log('im here')))))
    })

  Completed.subscribe(a => console.log('hey ', a))

  return {
    Completed,
    DOM: views.map(todos => (
      h('section', {class: {'main': true}}, [
        h('input', {attrs: {id: 'toggle-all', type: 'checkbox'}, class: {'toggle-all': true}}),
        h('label', {attrs: {for: 'toggle-all'}}),
        h('ul', {class: {'todo-list': true}}, todos)
      ])
    ))
  }
}
