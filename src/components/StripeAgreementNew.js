import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import logo from '../images/av-logo.svg'

export default function ({ amount, name, key }) {
  function onToken (token) {
    // send request to website one backend.
    console.log(token)
  }

  return (
    <Segment padded='very' className='paypal-section' raised>
      <Header as='h5'>Get Premium Mob via Credit/Debit Card:</Header>
      <StripeCheckout
        label='Subscribe'
        name={name}
        description='Monthly Subscription'
        image={logo}
        amount={amount || 1000}
        currency='GBP'
        stripeKey={key || ''}
        token={onToken}
      />
    </Segment>
  )
}
