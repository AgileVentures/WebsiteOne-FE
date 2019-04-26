import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
let paymentMethod = 'paypal'
export default ({ cookies, createBillingAgreement, setLoading, plan, dispatch }) => (
  <Segment padded='very' className='paypal-section' raised>
    <Header as='h5'>Get {plan.name} via Paypal:</Header>
    <form onClick={setLoading} onSubmit={createBillingAgreement(cookies, plan.id, dispatch, paymentMethod)}>
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
