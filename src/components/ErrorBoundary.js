import React, { Fragment } from 'react'
import { Header, Image } from 'semantic-ui-react'
import thinkingFrog from '../images/thinking-frog.svg'

const ErrorBoundary = () => {
  return (
    <Fragment>
      <Header as='h1'>Oops! There was an error...</Header>
      <Image src={thinkingFrog} size='large' />
      <Header as='h2'>
        Please try again later, or send us an email at info@agileventures.org
      </Header>
    </Fragment>
  )
}

export default ErrorBoundary
