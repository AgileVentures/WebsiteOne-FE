import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import logo from '../images/av-logo.svg'
import axios from '../helpers/http'

export default function ({ plan, stripeKey }) {
  async function onToken (token) {
    // send request to website one backend.
    const { id, email } = token
    const formKV = {
      stripeEmail: email,
      stripeToken: id
    }

    try {
      const response = await axios.post(
        `/subscriptions?plan=${plan.name}`,
        formKV,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      console.log(response)
    } catch (e) {
      // handle error.
    }
  }
  return (
    <Segment padded='very' className='paypal-section' raised>
      <Header as='h5'>Get Premium Mob via Credit/Debit Card:</Header>
      <StripeCheckout
        label='Subscribe'
        name={plan.name}
        description='Monthly Subscription'
        image={logo}
        amount={plan.stripePrice}
        currency='GBP'
        stripeKey={stripeKey || ''}
        token={onToken}
      />
    </Segment>
  )
}
