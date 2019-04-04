import React from 'react'
import './HomepageModal.scss'

export default ({ content }) => (
  <div class='wrap'>
    <div class='card'>
      <div class='card-pic-wrap'>
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
