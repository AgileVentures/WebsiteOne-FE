import axios from 'axios'

export let createProject = props => {
  const { title, description, status, cookies } = props
  return axios({
    method: 'POST',
    url: '/projects',
    data: {
      title,
      description,
      status
    },
    headers: {
      Authorization: cookies.get('_WebsiteOne_session')
    }
  })
}
