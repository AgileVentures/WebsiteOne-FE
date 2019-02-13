import axios from 'axios'

export default cookies => event => {
  event.preventDefault()
  return axios({
    method: 'POST',
    timeout: 50000,
    url: '/paypal/new.json',
    data: {
      plan: 1
    },
    headers: {
      Authorization: cookies.get('_WebsiteOne_session')
    }
  })
    .then(response => window.location.assign(response.data.redirect_url))
}
