import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { RingLoader } from 'react-spinners'
export class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = { about: null }
  }

  componentDidMount () {
    axios.get('api/v1/static-pages/about-us')
      .then(response => {
        this.setState({ about: response.data })
      })
  }

  render () {
    let { about } = this.state

    if (about) {
      return (<div id='main'> {ReactHtmlParser(about)} </div>)
    } else {
      return (
        <Container>
          <RingLoader sizeUnit={'px'} size={200} color={'#34495E'} />
        </Container>
      )
    }
  }
}
export default About
