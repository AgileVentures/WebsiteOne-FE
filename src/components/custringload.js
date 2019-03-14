import React from 'react'
import { Container } from 'semantic-ui-react'
import { RingLoader } from 'react-spinners'

const CustomRingLoader = () => {
  return (
    <Container>
      <RingLoader sizeUnit={'px'} size={200} color={'#34495E'} />
    </Container>
  )
}

export default CustomRingLoader
