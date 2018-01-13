import { Observable } from 'rxjs/Observable';
import { State, Actions } from 'lightpulse';
import { h } from 'snabbdom/h';
import { TodoList } from './TodoList';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';

export const App = () => {
    const { getState, setState } = State({ todos: [] });
    const { stream, handlers } = Actions({
        onKeyup: ev => ev.key === 'Enter' ? { type: 'add-todo', payload: ev.target.value } : null
    });

    // Create the TodoList subcomponent
    const List = TodoList({ props: getState().map(s => s.todos) });

    // Handle actions and state
    Observable.zip(getState(), stream)
              .do(([state, { type, payload }]) => {
                if (type === 'add-todo') {
                    setState({ todos: [...state.todos, { completed: false, title: payload }] });
                }
              }).subscribe();

    return {
        DOM: List.DOM.map(list => (
            h('div', { class: { 'todoapp': true } }, [
                h('div', [
                    h('h1', 'todos'),
                    h('input', {
                        attrs: { type: 'text', placeholder: 'What needs to be done?' },
                        class: { 'new-todo': true },
                        on: { keyup: handlers.onKeyup } })
                ]),
                list,
                h('footer', { class: { 'footer': true } }, [
                    h('span', { class: { 'todo-count': true } }, '0 items left'),
                    h('ul', { class: { 'filters': true } }, [
                        { name: 'All', href: '/all' },
                        { name: 'Active', href: '/active' },
                        { name: 'Complete', href: '/complete' }
                    ].map(({ name, href }) => (
                        h('li', [
                            h('a', { attrs: { href } }, name)
                        ])
                    ))),
                    h('button', { class: { 'clear-completed': true } }, 'Clear Completed')
                ])
            ])
        ))
    }
};
