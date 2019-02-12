import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Header, Container, Segment, Grid } from 'semantic-ui-react'
import PayPalAgreementNew from './PayPalAgreementNew'
import createBillingAgreement from '../actions/createBillingAgreement'
import queryString from 'query-string'
import LoadingOverlay from 'react-loading-overlay'
import { RingLoader } from 'react-spinners'
import ErrorBoundary from './ErrorBoundary'
import '../assets/Subscriptions.css'

let membership = props => {
  let info
  let plan = queryString.parse(props.location.search).plan
  if (plan === 'premiummob') {
    info = { id: 2, name: 'Premium Mob', price: '£25.00' }
  } else if (plan === 'premiumf2f') {
    info = { id: 3, name: 'Premium F2F', price: '£50.00' }
  } else {
    info = { id: 1, name: 'Premium', price: '£10.00' }
  }
  return info
}
export const Subscriptions = props => {
  let name = membership(props).name
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const path = props.location.pathname
    const search = props.location.search
    props.setLastLocation(path, search)
    if (!props.cookies.get('_WebsiteOne_session') && !props.loggedInUser.data) {
      props.history.push({ pathname: '/login' })
    }
    if (props.error.length) {
      setError(true)
    }
  })

  return (
    <Fragment>
      <Container>
        {!error ? <LoadingOverlay
          active={loading}
          styles={{
            overlay: (base) => ({
              ...base,
              background: 'rbg(255, 255, 255, 0.3)'
            })
          }}
          text={<RingLoader sizeUnit={'px'} size={200} color={'#ee7335'} />}
        >
          <Header as='h1'>AgileVentures {name} Membership</Header>
          <Header as='h5'>
          The price for {name} Membership is {membership(props).price}/Month
          </Header>
          <Header as='h5'>
            {name === 'Premium' ? '7 day free trial! No charge for 7 days' : null}
          </Header>
          <Grid columns={2} divided className='payment-section'>
            <Grid.Row>
              <Grid.Column>
                <PayPalAgreementNew
                  cookies={props.cookies}
                  createBillingAgreement={createBillingAgreement}
                  plan={membership(props)}
                  setLoading={setLoading}
                  dispatch={props.dispatch}
                />
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as='h5'>Get {name} via Credit/Debit Card:</Header>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </LoadingOverlay> : <ErrorBoundary error />}
      </Container>
    </Fragment>
  )
}
const mapStateToProps = (store, ownProps) => ({
  loggedInUser: store.loggedInUser,
  cookies: ownProps.cookies,
  error: store.error
})
export default connect(
  mapStateToProps,
  { setLastLocation }
)(Subscriptions)
