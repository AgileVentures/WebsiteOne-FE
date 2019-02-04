import { SET_LAST_LOCATION } from '../types'

export let setLastLocation = props => dispatch => {
  dispatch({ type: SET_LAST_LOCATION, payload: props.location.pathname })
}
