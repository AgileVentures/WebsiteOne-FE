import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import Custringloader from './custringload'
export class About extends React.Component {
    state = { about: null }

    componentDidMount () {
      axios.get('api/v1/static-pages/about-us')
        .then(response => {
          this.setState({ about: response.data })
        })
    }

    render () {
      let { about } = this.state

      if (about) {
        return (
          <Container>
            <div id='main'>{ ReactHtmlParser(about) }</div>
          </Container>)
      } else {
        return (
          <Custringloader sizeUnit={'px'} size={200} color={'#34495E'} />
        )
      }
    }
}
export default About
