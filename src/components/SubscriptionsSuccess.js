import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import executeBillingAgreement from '../actions/executeBillingAgreement'
import { Header, Container, Segment } from 'semantic-ui-react'
import queryString from 'query-string'
import membership from '../helpers/membershipInfo'
import ErrorBoundary from './ErrorBoundary'
import '../assets/SubscriptionsSuccess.css'

export const SubscriptionsSuccess = props => {
  const params = queryString.parse(props.location.search)
  const [error, setError] = useState(false)
  let name = membership(props, queryString).name
  useEffect(() => {
    if (props.error.length) {
      setError(true)
    } else if (params.token) {
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
              {name}{' '}
              Member!
            </Header>
            <Header as='h4' textAlign='center'>
              {name === 'Premium' ? 'Your 7 day free trial has now started. Your card will not be charged until 7 days have passed.' : null}
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
)(SubscriptionsSuccess)
