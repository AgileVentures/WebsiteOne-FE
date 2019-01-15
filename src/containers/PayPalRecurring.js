import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'
const PayPalButton = paypal.Button.driver('react', { React, ReactDOM })
let client = {
  sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX
}
let payment = () => {}
let onAuthorize = (data, actions) => {}

class PayPalRecurring extends Component {
  render () {
    return (
      <div className='shoppingCart'>
        <p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

        <PayPalButton
          client={client}
          payment={payment}
          commit
          onAuthorize={onAuthorize} />
      </div>
    )
  }
}
export default PayPalRecurring
