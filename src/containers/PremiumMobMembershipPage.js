import React, { Component } from 'react'
import CustomRingLoader from '../components/CustomRingLoader'
import { Container } from 'semantic-ui-react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'

export default class PremiumMobMembershipPage extends Component {
  state = { premiumMobMembershipPage: null }
  componentDidMount () {
    axios.get('api/v1/static-pages/premiummob')
      .then(response => {
        this.setState({ premiumMobMembershipPage: response.data })
      })
  }

  render () {
    let { premiumMobMembershipPage } = this.state
    if (premiumMobMembershipPage) {
      return (
        <Container>
          <div>
            { ReactHtmlParser(premiumMobMembershipPage) }
          </div>
        </Container>
      )
    } else {
      return (
        <CustomRingLoader />
      )
    }
  }
}
