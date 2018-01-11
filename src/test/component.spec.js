import test from 'ava';
import { State, Actions } from '../component';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';

test('State can be read', t => {
    const { getState } = State({ foo: 1 });
    return getState().take(1).do(s => t.deepEqual(s, { foo: 1 }));
});

test('State can be written', t => {
    const { getState, setState } = State({ foo: 1 });
    setState({ bar: 'baz' });
    return getState().take(1).do(s => t.deepEqual(s, { foo: 1, bar: 'baz' }));
});

test('Actions will generate an object with a stream and handlers', t => {
    const { stream, handlers } = Actions({
        onClick: ev => ({ type: 'onClick', payload: ev })
    });
    t.truthy(stream, 'Stream is not defined');
    t.truthy(handlers, 'Handlers is not defined');
});

test('Actions handler can take an event and produce an action on the stream', t => {
    const { stream, handlers } = Actions({
        onClick: ev => ({ type: 'onClick', payload: ev })
    });

    const onClickStream =
        stream.take(1)
              .do(({ type }) => t.true(type === 'onClick'));
    handlers.onClick();
    return onClickStream;
});
