import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import executeBillingAgreement from '../actions/executeBillingAgreement'
import { Header, Container, Segment } from 'semantic-ui-react'
import queryString from 'query-string'
import '../assets/PayPalSuccess.css'
import ErrorBoundary from './ErrorBoundary'

export const PayPalSuccess = props => {
  const params = queryString.parse(props.location.search)
  const [error, setError] = useState(false)
  useEffect(() => {
    if (props.error.length) {
      setError(true)
    } else {
      executeBillingAgreement(props.cookies, params, props.dispatch)
    }
  })
  return (
    <Fragment>
      <Container>
        {!error
          ? <Segment padded='very' className='payment-complete' raised>
            <Header as='h2' textAlign='center'>
              Thanks, you're now an AgileVentures {}
              {params.plan.charAt(0).toUpperCase() + params.plan.slice(1)}{' '}
              Member!
            </Header>
            <Header as='h4' textAlign='center'>
              Your 7 day free trial has now started. Your card will not be
              charged until 7 days have passed.
            </Header>
            <Header as='h5' textAlign='center'>
              An AgileVentures mentor will be in touch shortly to help you
              receive all of your membership benefits.
            </Header>
          </Segment> : <ErrorBoundary error />}
      </Container>
    </Fragment>
  )
}

const mapStateToProps = (store, ownProps) => ({
  cookies: ownProps.cookies,
  error: store.error
})
export default connect(
  mapStateToProps
)(PayPalSuccess)
