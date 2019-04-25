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
    startDateFormatted,
    startTime,
    project,
    description,
    timezones,
    duration,
    repeats,
    weekdaysLowerCase,
    repeatEnds,
    endDate
  } = props
  return axios({
    method: 'POST',
    url: '/events',
    data: {
      event: {
        name,
        category,
        for: eventFor,
        project_id: project,
        description,
        duration,
        repeats,
        start_datetime: startDate,
        time_zone: 'UTC',
        repeats_weekly_each_days_of_the_week: weekdaysLowerCase,
        repeat_ends_string: repeatEnds
      },
      start_date: startDateFormatted,
      next_date: startDateFormatted,
      start_time: startTime,
      start_time_tz: timezones,
      repeat_ends_on: endDate,
      token: headers
    },
    headers: {
      Authorization: headers,
      Accept: 'application/json'
    }
  })
    .then(response => {
      dispatch({ type: GET_EVENT_INFO, payload: response.data })
      history.push(`/events/${response.data.event.slug}`)
    })
    .catch(error => {
      dispatch({
        type: CREATE_EVENT_FAILURE,
        message: error.message
      })
    })
}
