import React, { Component, Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import HomepageModal from './HomepageModal'
import './Homepage.css'
import Footer from '../footer/Footer'
import Modal from './HomepageModal'
import modalContent from './modals'

export class Homepage extends Component {
  modals = modalContent.map(item => <Modal key={item.reactId} content={item} />);
  render () {
    return (
      <div>
        {this.modals}
        <Footer />
      </div>
    )
  }
}

export default Homepage
