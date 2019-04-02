import React, { Component, Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import HomepageModal from './HomepageModal'
import modals from './modals'
import './Homepage.css'

export class Homepage extends Component {
  renderModals () {
    return modals.map((modal, id) => {
      return (
        <HomepageModal key={id} modal={modal} />
      )
    })
  }

  render () {
    return (
      <Fragment>
        <Grid columns={16} stretched className='landing-page-background'>
          <Grid.Row style={{ height: '500px' }}>
          </Grid.Row>
          {this.renderModals()}
          <Grid.Row style={{ height: '320px' }}>
          </Grid.Row>
        </Grid>
      </Fragment>
    )
  }
}

export default Homepage
