import { SET_LAST_LOCATION } from '../types'

export let setLastLocation = (path, search) => dispatch => {
  dispatch({ type: SET_LAST_LOCATION, payload: { path, search } })
}
