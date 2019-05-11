import axios from '../helpers/http'
import { GET_EVENT_INFO } from '../types'

export let fetchEventInfo = slug => dispatch => {
  return axios
    .get(`/api/v1/events/${slug}`)
    .then(response => {
      let {
        event,
        videos,
        creator,
        creatorGravatarUrl,
        createdAt,
        modifier,
        modifierGravatarUrl,
        updatedAt,
        nextScheduledEvent
      } = response.data
      event.videos = videos
      event.creator = creator
      event.creatorGravatarUrl = creatorGravatarUrl
      event.modifier = modifier
      event.modifierGravatarUrl = modifierGravatarUrl
      event.createdAt = createdAt
      event.updatedAt = updatedAt
      event.nextScheduledEvent = nextScheduledEvent

      dispatch({ type: GET_EVENT_INFO, payload: event })
    })
}
