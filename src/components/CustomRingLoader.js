import React from 'react'
import { Container } from 'semantic-ui-react'
import { RingLoader } from 'react-spinners'
import '../assets/spinner.css'
const CustomRingLoader = props => {
  return (
    <Container id='spinner-container' >
      <RingLoader id='spinner'sizeUnit={'px'} size={200} color={props.color || '#34495E'} />
    </Container>
  )
}

export default CustomRingLoader
