import 'rxjs/add/operator/scan'

export const Application = (initial, actions, reducers = []) => {
  return actions.scan(
    (state, action) => reducers.reduce((partial, reducer) => reducer(state, action), {}),
    initial
  )
}
