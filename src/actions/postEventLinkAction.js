import axios from '../helpers/http'
// import { POST_EVENT_LINK } from '../types'
import { fetchEventInfo } from './getEventInfoAction'

export let postEventLink = props => dispatch => {
  // Need correct API method here once change is made to back end

  // return axios({
  //   method: 'put',
  //   url: `/hangouts/${props.id}`,
  //   data: {
  //     title: props.title,
  //     hangout_url: props.link
  //   }
  // }).then(() => {
  //   dispatch(fetchEventInfo(props.id))
  // })

  // For demonstration purposes for now:
  return axios
    .get('/events.json')
    .then(() => {
      dispatch(fetchEventInfo(props.slug))
    })
}
