import React from 'react'
import './HomepageModal.scss'

export default ({ content }) => (
  <div className='wrap'>
    <div className='card'>
      <div className='card-pic-wrap'>
        <img src={content.image} alt={content.imageAltText} />
      </div>
      <div class='card-content'>
        <h3>{content.title}</h3>
        <p>
          {content.modalText}
        </p>
      </div>
    </div>
  </div>
)
