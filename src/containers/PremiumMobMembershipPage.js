import React, { Component } from 'react'
import { RingLoader } from 'react-spinners'
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
        <Container>
          <RingLoader sizeUnit={'px'} size={200} color={'#34495E'} />
        </Container>
      )
    }
  }
}
