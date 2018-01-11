import * as snabbdom from 'snabbdom';
import classModule from 'snabbdom/modules/class';
import propsModule from 'snabbdom/modules/props';
import attributesModule from 'snabbdom/modules/attributes';
import styleModule from 'snabbdom/modules/style';
import eventsListenerModule from 'snabbdom/modules/eventlisteners';

const patch = snabbdom.init([
    classModule,
    propsModule,
    attributesModule,
    styleModule,
    eventsListenerModule
]);

export const render = (anchor, DOM) => {
    let node = anchor;
    DOM.subscribe(vnode => {
        node = patch(node, vnode);
    });
};
