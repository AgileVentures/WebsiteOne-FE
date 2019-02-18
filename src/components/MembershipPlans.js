import React, { Component } from 'react'
import { RingLoader } from 'react-spinners'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
export default class MembershipPlans extends Component {
  state = { membershipPlans: null }
  componentDidMount () {
    axios.get('api/v1/static-pages/membership-plans').then(response => {
      this.setState({ membershipPlans: response.data })
    })
  }

  render () {
    let { membershipPlans } = this.state
    if (membershipPlans) {
      return (
        <Container>
          <div dangerouslySetInnerHTML={{ __html: membershipPlans }} />
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
