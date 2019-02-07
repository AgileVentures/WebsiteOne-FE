import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Header, Container, Segment, Grid } from 'semantic-ui-react'
import PayPalAgreementNew from './PayPalAgreementNew'
import createBillingAgreement from '../helpers/createBillingAgreement'
import queryString from 'query-string'
import '../assets/Subscriptions.css'

const Subscriptions = props => {
  useEffect(() => {
    props.setLastLocation(props)
  })

  if (!props.cookies.get('_WebsiteOne_session')) {
    props.history.push('/login')
  }

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
              <Segment>
                <Header as='h5'>Get Premium Mob via Credit/Debit Card:</Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Fragment>
  )
}
const mapStateToProps = (_, ownProps) => ({ cookies: ownProps.cookies })
export default connect(
  mapStateToProps,
  { setLastLocation }
)(Subscriptions)
