import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Header, Container, Segment, Grid } from 'semantic-ui-react'
import PayPalAgreementNew from './PayPalAgreementNew'
import createBillingAgreement from '../helpers/createBillingAgreement'
import queryString from 'query-string'
import LoadingOverlay from 'react-loading-overlay'
import { RingLoader } from 'react-spinners'
import '../assets/Subscriptions.css'

export const Subscriptions = props => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const path = props.location.pathname
    const search = props.location.search
    props.setLastLocation(path, search)
    if (!props.loggedInUser || !props.cookies.get('_WebsiteOne_session')) {
      props.history.push({ pathname: '/login' })
    }
  })

  const { plan } = queryString.parse(props.location.search)
  return (
    <Fragment>
      <Container>
        <LoadingOverlay
          active={loading}
          styles={{
            overlay: (base) => ({
              ...base,
              background: 'rbg(255, 255, 255, 0.3)'
            })
          }}
          text={<RingLoader sizeUnit={'px'} size={200} color={'#ee7335'} />}
        >
          <Header as='h1'>
            AgileVentures {plan.charAt(0).toUpperCase() + plan.slice(1)}{' '}
            Membership
          </Header>
          <Header as='h5'>
            The price for {plan.charAt(0).toUpperCase() + plan.slice(1)}{' '}
            Membership is £10.00/Month
          </Header>
          <Header as='h5'>7 day free trial! No charge for 7 days</Header>
          <Grid columns={2} divided className='payment-section'>
            <Grid.Row>
              <Grid.Column>
                <PayPalAgreementNew
                  cookies={props.cookies}
                  createBillingAgreement={createBillingAgreement}
                  setLoading={setLoading}
                />
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as='h5'>
                    Get Premium Mob via Credit/Debit Card:
                  </Header>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </LoadingOverlay>
      </Container>
    </Fragment>
  )
}
const mapStateToProps = (store, ownProps) => ({
  loggedInUser: store.loggedInUser,
  cookies: ownProps.cookies
})
export default connect(
  mapStateToProps,
  { setLastLocation }
)(Subscriptions)
