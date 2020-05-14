import axios from '../helpers/http'
import { GET_EVENTS } from '../types'

export let fetchEvents = () => dispatch => {
  return axios
    .get('/events.json')
    .then(response => {
      let events = response.data.events.map(event => {
        event.start = new Date(event.start)
        event.end = new Date(event.end)
        return event
      })
      dispatch({ type: GET_EVENTS, payload: events })
    })
}
