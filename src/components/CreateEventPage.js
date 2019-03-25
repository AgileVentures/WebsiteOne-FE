import React from 'react'
import { Header, Container } from 'semantic-ui-react'

import EventForm from '../containers/EventForm'
const CreateEventPage = () => {
  return (
    <Container>
      <Header as='h1' textAlign='center'>
          Creating a new Event
      </Header>
      <EventForm />
    </Container>
  )
}

export default CreateEventPage
