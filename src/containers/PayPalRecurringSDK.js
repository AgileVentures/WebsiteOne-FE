import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-rest-sdk'
import {
  PAYPAL_CLIENT_ID_SANDBOX,
  PAYPAL_SECRET
} from 'babel-dotenv'
import url from 'url'

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'default'

paypal.configure({
  mode: ENV, // Sandbox or live
  client_id: PAYPAL_CLIENT_ID_SANDBOX,
  client_secret: PAYPAL_SECRET
})

console.log(paypal)

var isoDate = new Date()
isoDate.setSeconds(isoDate.getSeconds() + 4)
isoDate.toISOString().slice(0, 19) + 'Z'

var billingPlanAttributes = {
  'description': 'Find great developer jobs? Get help on the job search process?',
  'merchant_preferences': {
    'auto_bill_amount': 'yes',
    'cancel_url': 'http://localhost:8081/subscriptions',
    'initial_fail_amount_action': 'continue',
    'max_fail_attempts': '0',
    'return_url': 'http://localhost:8081/subscriptions',
    'setup_fee': {
      'currency': 'GBP',
      'value': '0'
    }
  },
  'name': 'Premium',
  'payment_definitions': [
    {
      'amount': {
        'currency': 'GBP',
        'value': '10'
      },
      'charge_models': [
        {
          'amount': {
            'currency': 'GBP',
            'value': '0'
          },
          'type': 'SHIPPING'
        },
        {
          'amount': {
            'currency': 'GBP',
            'value': '0'
          },
          'type': 'TAX'
        }
      ],
      'cycles': '12',
      'frequency': 'MONTH',
      'frequency_interval': '1',
      'name': 'Regular payment definition',
      'type': 'REGULAR'
    },
    {
      'amount': {
        'currency': 'GBP',
        'value': '0'
      },
      'charge_models': [
        {
          'amount': {
            'currency': 'GBP',
            'value': '0'
          },
          'type': 'SHIPPING'
        },
        {
          'amount': {
            'currency': 'USD',
            'value': '0'
          },
          'type': 'TAX'
        }
      ],
      'cycles': '1',
      'frequency': 'WEEK',
      'frequency_interval': '1',
      'name': 'Trial 1',
      'type': 'TRIAL'
    }
  ],
  'type': 'INFINITE'
}

var billingPlanUpdateAttributes = [
  {
    'op': 'replace',
    'path': '/',
    'value': {
      'state': 'ACTIVE'
    }
  }
]

var billingAgreementAttributes = {
  'name': 'Premium Membership',
  'description': 'Monthly agreement with a regular monthly payment definition and 1-week trial payment definition.',
  'start_date': isoDate,
  'plan': {
    'id': 'P-0NJ10521L3680291SOAQIVTQ'
  },
  'payer': {
    'payment_method': 'paypal'
  }
}

// Create the billing plan
paypal.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
  if (error) {
    console.log(error)
    throw error
  } else {
    console.log('Create Billing Plan Response')
    console.log(billingPlan)

    // Activate the plan by changing status to Active
    paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
      if (error) {
        console.log(error)
        throw error
      } else {
        console.log('Billing Plan state changed to ' + billingPlan.state)
        billingAgreementAttributes.plan.id = billingPlan.id

        // Use activated billing plan to create agreement
        paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
          if (error) {
            console.log(error)
            throw error
          } else {
            console.log('Create Billing Agreement Response')
            // console.log(billingAgreement);
            for (var index = 0; index < billingAgreement.links.length; index++) {
              if (billingAgreement.links[index].rel === 'approval_url') {
                var approvalUrl = billingAgreement.links[index].href
                console.log('For approving subscription via Paypal, first redirect user to')
                console.log(approvalUrl)

                console.log('Payment token is')
                console.log(url.parse(approvalUrl, true).query.token)
                // See billing_agreements/execute.js to see example for executing agreement
                // after you have payment token
              }
            }
          }
        })
      }
    })
  }
})

// let billingAgreement = () => {
//   return paypal.rest.billingAgreement
//     .create(ENV, client, {
//       name: 'Premium Membership',
//       description:
//         'Monthly agreement with a regular monthly payment definition and 1-week trial payment definition.',
//       start_date: '2019-01-20T09:13:49Z',
//       plan: {
//         type: 'MERCHANT_INITIATED_BILLING',
//         id: 'P-98S68313UK7404721NSNR7LI'
//         //  type: 'RECURRING_PAYMENTS'
//       },
//       payer: {
//         payment_method: 'paypal'
//       }
//     })
//     .then(billingAgreement => {
//       console.log(JSON.stringify(billingAgreement))
//       console.log('Billing Agreement Created Successfully')
//       return billingAgreement
//     })
//     .catch(error => {
//       console.error(JSON.stringify(error))
//       throw error
//     })
// }

// let onAuthorize = (data, actions) => {
//   console.log('data', data)
//   console.log('actions', actions)
//   axios.defaults.headers.common.Authorization = `Basic ${ACCESS_TOKEN}`
//   axios.post(`https://api.sandbox.paypal.com/v1/payments/billing-agreements/${data.paymentToken}/agreement-execute`)
//     .catch(error => {
//       console.error(JSON.stringify(error))
//       throw error
//     })
// }

class PayPalRecurringSDK extends Component {
  render () {
    return (
      <div>
        {/* <PayPalButton
          client={client}
          payment={billingAgreement}
          commit
          onAuthorize={onAuthorize}
          env={ENV}
          style={{ size: 'large' }}
        /> */}
      </div>
    )
  }
}
export default PayPalRecurringSDK
