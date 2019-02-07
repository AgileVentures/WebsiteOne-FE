import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import executeBillingAgreement from '../helpers/executeBillingAgreement'
import { Header } from 'semantic-ui-react'

const PayPalSuccess = props => {
  useEffect(() => {
    executeBillingAgreement(props)
  })
  return <Header>Success!</Header>
}

const mapStateToProps = (_, ownProps) => ({ cookies: ownProps.cookies })
export default connect(
  mapStateToProps,
  null
)(PayPalSuccess)
