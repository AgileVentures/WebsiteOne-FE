import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

export default ({ cookies, createBillingAgreement }) => (
  <Segment padded='very' className='paypal-section'>
    <Header as='h5'>Get Premium via Paypal:</Header>
    <form onSubmit={createBillingAgreement(cookies)}>
      <input
        type='image'
        name='submit'
        src='https://www.paypalobjects.com/en_GB/i/btn/btn_subscribe_LG.gif'
        alt='PayPal Subscribe button'
      />
      <img
        alt=''
        width='2'
        height='2'
        src='https://www.paypalobjects.com/en_GB/i/scr/pixel.gif'
        hidden=''
        style={{ display: 'none !important' }}
      />
    </form>
  </Segment>
)
