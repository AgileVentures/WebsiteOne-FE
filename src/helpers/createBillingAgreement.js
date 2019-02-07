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
      // test for status you want, etc
      window.location.assign(response.data.redirect_url)
    }
    // Don't forget to return something
    return response.data
  } catch (err) {
    console.error(err)
  }
}
