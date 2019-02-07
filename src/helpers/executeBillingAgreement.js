import axios from 'axios'

export default async (props, params) => {
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
        Authorization: props.cookies.get('_WebsiteOne_session')
      }
    })
    if (response.status === 200) {
      // test for status you want, etc
      console.log(response)
    }
    // Don't forget to return something
  } catch (err) {
    console.log(err)
  }
}
