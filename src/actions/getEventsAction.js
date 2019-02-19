import axios from '../helpers/http'
import { GET_EVENTS } from '../types'

export let fetchEvents = () => dispatch => {
  return axios
    .get('api/v1/events/upcoming')
    .then(response => {
      console.log(response)
      dispatch({ type: GET_EVENTS, payload: response.data.events })
    })
}
