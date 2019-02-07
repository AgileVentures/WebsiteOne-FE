import axios from 'axios'

export default cookies => async event => {
  event.preventDefault()
  try {
    let response = await axios({
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
    if (response.status === 200) {
      window.location.assign(response.data.redirect_url)
    }
    return response.data
  } catch (err) {
    console.log(err)
  }
}
