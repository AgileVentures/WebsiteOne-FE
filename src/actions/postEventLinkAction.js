import axios from '../helpers/http'

export let postEventLink = props => dispatch => {
  return axios({
    method: 'put',
    url: `/hangouts/${props.id}`,
    data: {
      title: props.title,
      hangout_url: props.link,
      notify_hangout: true,
      project_id: props.projectId,
      event_id: props.id
      // token: props.cookies.get(process.env.SESSION || 'WebsiteOne_session')
    },
    headers: {
      Authorization: props.cookies.get(process.env.SESSION || 'WebsiteOne_session'),
      Accept: 'application/json'
    }
  })
}
