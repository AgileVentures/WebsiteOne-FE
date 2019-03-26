import React from 'react'
import './footer.css'
export default () => {
  return (
    <div className='footer'>
      <div className='contain'>
        <div className='col'>
          <h1>Learn More</h1>
          <ul>
            <li>
              <a href='/about-us'>About Us</a>
            </li>
            <li>
              <a href='/getting-started'>Getting Started</a>
            </li>
            <li>
              <a href='/dashboard'>Dashboard</a>
            </li>
            <li>
              <a href='/opportunities'>Opportunities</a>
            </li>
            <li>
              <a href='http://nonprofits.agileventures.org/blog/'>Blog</a>{' '}
            </li>
            <li>
              <a href='http://www.agileventures.org/press-kit'>Press Kit</a>
            </li>
          </ul>
        </div>
        <div className='col'>
          <h1>Social</h1>
          <ul>
            <li>
              <a
                className='facebook'
                href='https://www.facebook.com/agileventures'
                target='_blank'

              >
                <i className='fa fa-facebook fa-custom-social' />&nbsp;Facebook
              </a>
            </li>
            <li>
              <a
                className='twitter'
                href='https://twitter.com/AgileVentures'
                target='_blank'

              >
                <i className='fa fa-twitter fa-custom-social' />&nbsp;Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className='col'>
          <h1>Our Sponsors</h1>
          <ul>
            <li>
              <a
                href='https://standuply.com/?utm_source=links&amp;utm_medium=agileventures&amp;utm_campaign=partnership'
                target='_blank'
              >
                    Standup Bot
              </a>
            </li>
            <li>
              <a href='http://craftacademy.se/english' target='_blank'>
                    Craft Academy
              </a>
            </li>
            <li>
              <a href='http://mooqita.org/' target='_blank'>
                    Mooqita
              </a>
            </li>
            <li>
              <a href='/sponsors'>
                    Becoming a sponsor
              </a>
            </li>
          </ul>
        </div>
        <div className='col'>
          <h1>Contact us</h1>
          <p>
                Send a traditional email to{' '}
            <a href='mailto:info@agileventures.org'>info@agileventures.org</a>
                .
          </p>
          <p>
                We are a Charitable Incorporated Organisation (CIO) in the UK. Ref
                #1170963
          </p>
        </div>

        <div className='clearfix' />
      </div>
    </div>
  )
}
