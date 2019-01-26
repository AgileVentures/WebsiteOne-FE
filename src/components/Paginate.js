import React, { Fragment } from 'react'
import { RingLoader } from 'react-spinners'
import { Header } from 'semantic-ui-react'

const Paginate = ({ items, Component, error }) => {
  let itemsArray
  let errorMessage

  if (error) {
    errorMessage = (
      <Fragment>
        <Header as='h1'>
        Oops! There was an error fetching Projects...
        </Header>
        <Header as='h2'>
        Please try again later, or
        send us an email at info@agileventures.org
        </Header>
      </Fragment>
    )
  }
  if (items.length) {
    itemsArray = items.map(item => <Component key={item.id} item={item} />)
  }
  return (
    itemsArray || errorMessage || <RingLoader sizeUnit={'px'} size={200} color={'#34495E'} />
  )
}

export default Paginate
