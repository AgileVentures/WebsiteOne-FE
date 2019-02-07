import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../helpers/http'
import { setLastLocation } from '../actions/setLastLocationAction'
// import { Redirect } from 'react-router'

class PayPalRecurring extends Component {
  componentDidMount () {
    console.log(this.props)
    this.props.setLastLocation(this.props)
  }
  billingAgreement = async event => {
    const { cookies } = this.props
    const auth = cookies.get('_WebsiteOne_session')
    console.log(cookies.get('_WebsiteOne_session'))

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
          Authorization: auth
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
  };

  render () {
    return (
      <div>
        <form onSubmit={this.billingAgreement}>
          <input
            type='image'
            name='submit'
            src='https://www.paypalobjects.com/en_GB/i/btn/btn_subscribe_LG.gif'
            alt='Subscribe'
          />
          <img
            alt=''
            width='1'
            height='1'
            src='https://www.paypalobjects.com/en_GB/i/scr/pixel.gif'
            hidden=''
            style={{ display: 'none !important' }}
          />
        </form>
      </div>
    )
  }
}
const mapStateToProps = (store, ownProps) => ({
  loggedInUser: store.loggedInUser,
  cookies: ownProps.cookies
})
export default connect(
  mapStateToProps,
  { setLastLocation }
)(PayPalRecurring)
