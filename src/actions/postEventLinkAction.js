import axios from '../helpers/http'
// import { POST_EVENT_LINK } from '../types'
import { fetchEventInfo } from './getEventInfoAction'

export let postEventLink = props => dispatch => {
  // Need correct API method here once change is made to back end

  return axios({
    method: 'put',
    url: `http://localhost:3000/hangouts/${props.id}`,
    data: {
      title: props.title,
      hangout_url: props.link,
      notify_hangout: true,
      project_id: props.project_id,
      event_id: props.id
      // token: props.cookies.get(process.env.SESSION || 'WebsiteOne_session')
    },
    headers: {
      Authorization: props.cookies.get(process.env.SESSION || 'WebsiteOne_session'),
      Accept: 'application/json'
    }
  }).then(res => {
    console.log(res)
    // dispatch(fetchEventInfo(props.id))
  })

  // For demonstration purposes for now:
  // return axios
  //   .get('/events.json')
  //   .then(() => {
  //     dispatch(fetchEventInfo(props.slug))
  //   })
}
