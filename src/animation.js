import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { animationFrame } from 'rxjs/scheduler/animationFrame'

import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/defer'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/bufferCount'
import 'rxjs/add/operator/takeWhile'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/let'

// Helpers
export function lastTwoValues () {
  return (obs) => {
    return obs.bufferCount(2)
  }
}

// Observable of time passed since it started to execute and the current frame draw.
const TimeLapse = () => {
  return Observable.defer(() => {
    const start = animationFrame.now()
    return Observable.interval(0, animationFrame)
      .map(() => animationFrame.now() - start)
  })
}

export const duration = (ms) => {
  return new Observable((observer) => {
    const cancel = new BehaviorSubject(false)
    TimeLapse().map(t => t / ms)
      .takeUntil(cancel.asObservable().filter(v => v))
      .subscribe(t => t <= 1 ? observer.next(t) : observer.complete())
    return () => cancel.next(true)
  })
}

export const distance = (d) => (v) => d * v

export const tween = (ms, easing) => {
  return (sources) => {
    return sources.let(lastTwoValues())
      .switchMap(([p, n]) =>
        duration(ms)
          .map(easing)
          .map((v) => n >= p ? v : 1 - v)
          .map(distance(Math.abs(n - p))))
  }
}

export const animate = ({from, to, easing, ms}) => {
  return Observable.from([from, to]).let(tween(ms, easing))
}
