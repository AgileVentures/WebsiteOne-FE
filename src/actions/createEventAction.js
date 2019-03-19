import axios from 'axios'
import { GET_EVENT_INFO, CREATE_EVENT_FAILURE } from '../types'

export let createEvent = props => dispatch => {
  const {
    headers,
    history,
    name,
    category,
    eventFor,
    startDate,
    startTime,
    project,
    description,
    timezone,
    duration,
    repeats } = props
  return axios({
    method: 'POST',
    url: '/events',
    data: {
      name,
      category,
      for: eventFor,
      description,
      duration,
      repeats,
      start_datetime: startDate,
      next_date: startDate,
      start_time: startTime,
      project_id: project,
      start_time_tz: timezone,
      time_zone: timezone
    },
    headers: {
      Authorization: headers,
      Accept: 'application/json'
    }
  })
    .then(response => {
      dispatch({ type: GET_EVENT_INFO, payload: response.data })
      history.push(`/events/${response.data.event.id}`)
    })
    .catch(error => {
      dispatch({
        type: CREATE_EVENT_FAILURE,
        message: error.message
      })
    })
}
