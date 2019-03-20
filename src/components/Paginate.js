import React from 'react'
import CustomRingLoader from './CustomRingLoader'

const Paginate = ({ items, Component, error }) => {
  let itemsArray

  if (items.length) {
    itemsArray = items.map(item => <Component key={item.id} item={item} />)
  }
  return (
    itemsArray || error || <CustomRingLoader />
  )
}

export default Paginate
