import axios from 'axios'

export default (props, params) => {
  return axios({
    method: 'GET',
    timeout: 50000,
    url: '/paypal/create.json',
    params: {
      plan: params.plan,
      token: params.token
    },
    headers: {
      Authorization: props.cookies.get('_WebsiteOne_session')
    }
  })
}
