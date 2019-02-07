import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../helpers/http'
import { Header } from 'semantic-ui-react'
import queryString from 'query-string'

class PayPalSuccess extends Component {
  componentDidMount = async () => {
    console.log(this.props)
    console.log(queryString.parse(this.props.location.search))
    const params = queryString.parse(this.props.location.search)
    console.log(params.token)
    const { cookies } = this.props
    const auth = cookies.get('_WebsiteOne_session')
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
          Authorization: auth
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
  };

  render () {
    return <Header>Success!</Header>
  }
}
const mapStateToProps = (store, ownProps) => ({ loggedInUser: store.loggedInUser, cookies: ownProps.cookies })
export default connect(
  mapStateToProps,
  null
)(PayPalSuccess)
