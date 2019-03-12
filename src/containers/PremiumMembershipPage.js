import React, { Component } from 'react'
import Custringloader  from './custringload'
import { Container } from 'semantic-ui-react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'

export default class PremiumMembershipPage extends Component {
  state = { premiumMembershipPage: null }
  componentDidMount () {
    axios.get('api/v1/static-pages/premium')
      .then(response => {
        this.setState({ premiumMembershipPage: response.data })
      })
  }

  render () {
    let { premiumMembershipPage } = this.state
    if (premiumMembershipPage) {
      return (
        <Container>
          <div>
            { ReactHtmlParser(premiumMembershipPage) }
          </div>
        </Container>
      )
    } else {
      return (        
          <Custringloader sizeUnit={'px'} size={200} color={'#34495E'} />       
      )
    }
  }
}
