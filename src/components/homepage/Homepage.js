import React, { Component } from 'react'
import Modal from './HomepageModal'
import modalContent from './modals'

import './Homepage.css'

export class Homepage extends Component {
  modals = modalContent.map(item => <Modal key={item.reactId} content={item} />);
  render () {
    return (
      <div className='landing-page-background'>
        {this.modals}
      </div>
    )
  }
}

export default Homepage
