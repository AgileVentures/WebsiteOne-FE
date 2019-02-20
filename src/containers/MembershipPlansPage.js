import React, { Component } from 'react'
import { RingLoader } from 'react-spinners'
import { Container } from 'semantic-ui-react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
export default class MembershipPlansPage extends Component {
  state = { membershipPlansPage: null };
  componentDidMount () {
    axios.get('api/v1/static-pages/membership-plans').then(response => {
      this.setState({ membershipPlansPage: response.data })
    })
  }

  render () {
    let { membershipPlansPage } = this.state
    if (membershipPlansPage) {
      return (
        <Container>
          <div>{ReactHtmlParser(membershipPlansPage)}</div>
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
