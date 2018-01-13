import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/filter'

/**
 * State
 */
export function State (initial) {
  const local = new BehaviorSubject(initial)
  const updates = new BehaviorSubject(null)
  const getState = () => local.asObservable().filter(s => !!s)
  const setState = (change) => updates.next(change)
  updates.filter(p => !!p)
    .scan((prev, change) => ({...prev, ...change}), initial)
    .do(latest => local.next(latest))
    .subscribe()
  return {getState, setState}
}

/**
 * Actions
 */
export function Actions (m) {
  const all = new BehaviorSubject(null)
  const stream = all.asObservable().filter(a => !!a)
  const handlers = Object.keys(m).reduce((handlers, key) => {
    return {
      ...handlers,
      [key]: (ev, ...others) => {
        const res = m[key](ev, ...others)
        res instanceof Observable
          ? res.subscribe(r => all.next(r))
          : all.next(res)
      }
    }
  }, {})
  return {stream, handlers}
}
