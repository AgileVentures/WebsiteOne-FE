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
  return paypal.rest.billingAgreement
    .create(ENV, client, {
      name: 'Premium Membership',
      description:
        'Monthly agreement with a regular monthly payment definition and 1-week trial payment definition.',
      start_date: '2019-01-20T09:13:49Z',
      plan: {
        type: 'MERCHANT_INITIATED_BILLING',
        id: 'P-98S68313UK7404721NSNR7LI'
        //  type: 'RECURRING_PAYMENTS'
      },
      payer: {
        payment_method: 'paypal'
      }
    })
    .then(billingAgreement => {
      console.log(JSON.stringify(billingAgreement))
      console.log('Billing Agreement Created Successfully')
      return billingAgreement
    })
    .catch(error => {
      console.error(JSON.stringify(error))
      throw error
    })
}

let onAuthorize = (data, actions) => {
  console.log('data', data)
  console.log('actions', actions)
  axios.post({
    authorization: `Basic ${ACCESS_TOKEN}`,
    url: `https://api.sandbox.paypal.com/v1/payments/billing-agreements/${data.paymentToken}/agreement-execute`
  }).catch(error => {
    console.error(JSON.stringify(error))
    throw error
  })
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
