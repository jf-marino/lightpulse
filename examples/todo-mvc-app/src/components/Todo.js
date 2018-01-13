import { Actions } from 'lightpulse';
import { h } from 'snabbdom/h';

/**
 * Todo item component.
 * @param props - Observable
 */
export const Todo = ({ props }) => {
    const { stream, handlers } = Actions({
        onClick: () => ({ type: 'toggle' })
    });

    return {
        Events: stream,
        DOM: props.map(({ title, completed }) => (
            h('li', { on: { click: (ev) => handlers.onClick } }, [
                h('input', { attrs: { type: 'checkbox' }, class: { toggle: true } }),
                h('label', title)
            ])
        ))
    }
}
