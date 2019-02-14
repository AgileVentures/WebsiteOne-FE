import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Header, Container, Segment, Grid } from 'semantic-ui-react'
import PayPalAgreementNew from './PayPalAgreementNew'
import createBillingAgreement from '../helpers/createBillingAgreement'
import queryString from 'query-string'
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

  useEffect(() => {
    const path = props.location.pathname
    const search = props.location.search
    props.setLastLocation(path, search)
    if (!props.loggedInUser || !props.cookies.get('_WebsiteOne_session')) {
      props.history.push({ pathname: '/login' })
    }
  })

  return (
    <Fragment>
      <Container>
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
              />
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h5'>Get {name} via Credit/Debit Card:</Header>
              </Segment>
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
