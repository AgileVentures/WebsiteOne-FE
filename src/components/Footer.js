import React from 'react'
import { Grid, Header, List, Container, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../assets/Footer.css'

const LINKS = {
  learnMore: [
    { text: 'About Us', href: '/about-us' },
    { text: 'Getting Started', href: '/getting-started' },
    { text: 'Dashboard', href: '/dashboard' },
    { text: 'Opportunities', href: '/opportunities' },
    { text: 'Blog', href: 'http://nonprofits.agileventures.org/blog/' },
    { text: 'Press Kit', href: 'http://www.agileventures.org/press-kit' }
  ],
  social: [
    { text: 'Facebook', href: 'https://www.facebook.com/agileventures' },
    { text: 'Twitter', href: 'https://twitter.com/AgileVentures' }
  ],
  sponsors: [
    { text: 'Standup Bot', href: 'https://standuply.com/?utm_source=links&amp;utm_medium=agileventures&amp;utm_campaign=partnership' },
    { text: 'Craft Academy', href: 'http://craftacademy.se/english' },
    { text: 'Mooqita', href: 'http://mooqita.org/' },
    { text: 'Becoming a Sponsor', href: '/sponsors' }
  ]
}

export const LinksList = ({ links }) => (
  <List>
    {links.map(link => (
      <List.Item key={link.href}>
        {link.href.startsWith('/') ? (
          <Link to={link.href}>
            {link.text}
          </Link>
        ) : (
          <a href={link.href} target='_blank' rel='noreferrer'>
            {link.text}
          </a>
        )}
      </List.Item>
    ))}
  </List>
)

export default () => {
  return (
    <div className='footer'>
      <Grid container stackable columns={4}>
        <Grid.Column width={3}>
          <Segment basic>
            <Header sub className='list-header' color='grey'>Learn More</Header>
            <LinksList links={LINKS.learnMore} />
          </Segment>
        </Grid.Column>

        <Grid.Column width={3}>
          <Segment basic>
            <Header sub className='list-header' color='grey'>Social</Header>
            <LinksList links={LINKS.social} />
          </Segment>
        </Grid.Column>

        <Grid.Column width={3}>
          <Segment basic>
            <Header sub className='list-header' color='grey'>Our Sponsors</Header>
            <LinksList links={LINKS.sponsors} />
          </Segment>
        </Grid.Column>

        <Grid.Column width={6}>
          <Segment basic>
            <Header sub className='list-header' color='grey'>Contact us</Header>
            <div className='content'>
              Send a traditional email to{' '}
              <a href='mailto:info@agileventures.org'>info@agileventures.org</a>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>

      <Container>
        <Segment basic textAlign='center'>
          <div className='content'>
            We are a Charitable Incorporated Organisation (CIO) in the UK. Ref #1170963
          </div>
        </Segment>
      </Container>
    </div>
  )
}
