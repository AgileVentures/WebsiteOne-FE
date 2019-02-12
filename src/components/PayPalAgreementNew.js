import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

export default ({ cookies, createBillingAgreement, plan }) => (
  <Segment padded='very' className='paypal-section' raised>
    <Header as='h5'>Get {plan.name} via Paypal:</Header>
    <form onSubmit={createBillingAgreement(cookies, plan.id)}>
      <input
        type='image'
        name='submit'
        src='https://www.paypalobjects.com/en_GB/i/btn/btn_subscribe_LG.gif'
        alt='PayPal Subscribe button'
      />
      <img
        alt=''
        border='0'
        src='https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif'
        width='1'
        height='1'
      />
    </form>
  </Segment>
)
