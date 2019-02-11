import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Header, Container, Grid } from 'semantic-ui-react'
import PayPalAgreementNew from './PayPalAgreementNew'
import StripeAgreementNew from './StripeAgreementNew'
import createBillingAgreement from '../helpers/createBillingAgreement'
import queryString from 'query-string'
import '../assets/Subscriptions.css'

export const Subscriptions = props => {
  useEffect(() => {
    const path = props.location.pathname
    const search = props.location.search
    props.setLastLocation(path, search)
    if (!props.loggedInUser.data || !props.cookies.get('_WebsiteOne_session')) {
      props.history.push({ pathname: '/login' })
    }
  })

  const { plan } = queryString.parse(props.location.search)
  return (
    <Fragment>
      <Container>
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
              />
            </Grid.Column>
            <Grid.Column>
              <StripeAgreementNew
                key='ENTER_A_KEY'
                amount={1000}
                name='Premium Mob Membership'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
