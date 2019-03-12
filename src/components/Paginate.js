import React from 'react'
import Custringloader from '../containers/custringload'

const Paginate = ({ items, Component, error }) => {
  let itemsArray

  if (items.length) {
    itemsArray = items.map(item => <Component key={item.id} item={item} />)
  }
  return (
    itemsArray || error || <Custringloader sizeUnit={'px'} size={200} color={'#34495E'} />
  )
}

export default Paginate
