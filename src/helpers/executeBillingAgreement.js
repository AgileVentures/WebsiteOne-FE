import axios from 'axios'
import queryString from 'query-string'

export default async props => {
  const params = queryString.parse(props.location.search)
  const cookies = props.cookies.get('_WebsiteOne_session')
  try {
    let response = await axios({
      method: 'GET',
      timeout: 50000,
      url: '/paypal/create.json',
      params: {
        plan: params.plan,
        token: params.token
      },
      headers: {
        Authorization: cookies
      }
    })
    if (response.status === 200) {
      // test for status you want, etc
      console.log(response)
    }
    // Don't forget to return something
    return response.data
  } catch (err) {
    console.error(err)
  }
}
