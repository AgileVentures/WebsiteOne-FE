import axios from '../helpers/http'
import { GET_EVENT_INFO } from '../types'

export let fetchEventInfo = slug => dispatch => {
  return axios
    .get(`/api/v1/events/${slug}`)
    .then(response => {
      let {
        event,
        video,
        creator,
        modifier
      } = response.data
      event.video = video
      event.creator = creator
      event.modifier = modifier

      dispatch({ type: GET_EVENT_INFO, payload: event })
    })
}
