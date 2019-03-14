import React from 'react'
import CustomRingLoader from './customringloader'

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
