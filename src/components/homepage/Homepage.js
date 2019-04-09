<<<<<<< HEAD
import React, { Component, Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import HomepageModal from './HomepageModal'
import modals from './modals'
=======
import React, { Component } from 'react'
import Modal from './HomepageModal'
import modalContent from './modals'

>>>>>>> c6a0e7d06a2f617b799a0e4acf72468112b9b2c9
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
