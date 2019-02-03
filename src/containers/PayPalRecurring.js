import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'
import {
  PAYPAL_CLIENT_ID_SANDBOX,
  PAYPAL_CLIENT_ID_PRODUCTION,
  ACCESS_TOKEN
} from 'babel-dotenv'
import axios from 'axios'
const PayPalButton = paypal.Button.driver('react', { React, ReactDOM })

let client = {
  sandbox: PAYPAL_CLIENT_ID_SANDBOX,
  production: PAYPAL_CLIENT_ID_PRODUCTION
}
console.log(paypal)

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
let billingAgreement = () => {
  axios.post('http://localhost:3000/paypal/new?plan=premium')
}

let onAuthorize = (data, actions) => {
}

class PayPalRecurring extends Component {
  render () {
    return (
      <div>
        <PayPalButton
          client={client}
          payment={billingAgreement}
          commit
          onAuthorize={onAuthorize}
          env={ENV}
          style={{ size: 'large' }}
        />
      </div>
    )
  }
}
export default PayPalRecurring
