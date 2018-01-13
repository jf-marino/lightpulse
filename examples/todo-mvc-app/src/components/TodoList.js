import { Observable } from 'rxjs/Observable';
import { h } from 'snabbdom/h';
import { Todo } from './Todo';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/combineAll';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeAll';


export const TodoList = ({ props }) => {
    // const { handlers } = Actions({ });
    const items = props.map(todos => todos.map(todo => {
        return Todo({ props: Observable.of(todo) });
    }));

    const views = items.map(list => list.map(todo => todo.DOM))
                       .concatMap(list => Observable.combineLatest(...list))
                       .startWith([]);

    // Return a stream of todos completion events
    const Completed =
        items.map(list =>
                    list.map(todo =>
                        todo.Events.filter(({ type }) => type === 'toggle')
                                   .map(({ type }) => ({ type, payload: todo }))))
             .mergeAll();

    return {
        Completed,
        DOM: views.map(todos => (
            h('section', { class: { 'main': true } }, [
                h('input', { attrs: { id: 'toggle-all', type: 'checkbox' }, class: { 'toggle-all': true } }),
                h('label', { attrs: { for: 'toggle-all' } }),
                h('ul', { class: { 'todo-list': true } }, todos)
            ])
        ))
    };
};
