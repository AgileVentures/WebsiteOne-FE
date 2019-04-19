import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import '../assets/HomepageModal.css'

export default ({ content }) => (
  <Container>
    <Grid columns={3} id='landing-page-cards' stackable>
      <Grid.Row>
        <Grid.Column width={6} className='card-pic-wrap'>
          <img src={content.image} alt={content.imageAltText} />
        </Grid.Column>
        <Grid.Column width={2} />
        <Grid.Column width={6} className='card-content'>
          <Header as='h2'>{content.title}</Header>
          <p>
            {content.modalText}
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
)
