import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import Modal from './HomepageModal'
import modalContent from './modals'

import './Homepage.css'

export class Homepage extends Component {
  modals = modalContent.map(item => <Modal key={item.reactId} content={item} />);
  render () {
    return (
      <div className='landing-page-background'>
        <Container>
          <Grid columns={2} stackable>
            <Grid.Column width={12}>
              {this.modals[0]}
            </Grid.Column>
            <Grid.Column width={12} floated='right'>
              {this.modals[1]}
            </Grid.Column>
            <Grid.Column width={12}>
              {this.modals[2]}
            </Grid.Column>
            <Grid.Column width={12} floated='right'>
              {this.modals[3]}
            </Grid.Column>
            <Grid.Column width={12}>
              {this.modals[4]}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Homepage
