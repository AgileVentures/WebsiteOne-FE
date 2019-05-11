import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventInfo } from '../actions/getEventInfoAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { postEventLink } from '../actions/postEventLinkAction'
import { Container } from 'semantic-ui-react'
import EventSummary from '../components/EventSummary'

export class EventInfo extends Component {
  state = {
    link: '',
    event: null,
    eventActions: null
  };

  componentDidMount () {
    const eventSlug = this.props.match.params.slug
    this.props.setLastLocation(this.props.location.pathname)
    if (this.props.event.slug === this.props.match.params.slug) {
      this.setState({ event: this.props.event })
    } else {
      this.props.fetchEventInfo(eventSlug)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.event !== nextProps.event) {
      this.setState({ event: nextProps.event })
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleCancelEventAction = e => {
    e.preventDefault()
    this.setState({ eventActions: null })
  }

  handleLinkFormSubmit = e => {
    e.preventDefault()
    const { id, name, slug, project_id: projectId } = this.props.event
    const { cookies } = this.props
    this.props.postEventLink({ id, title: name, slug, link: this.state.link, cookies, projectId })
  };

  render () {
    let { event, eventActions, link } = this.state
    return (
      <Container className='event-info-container'>
        <EventSummary
          cookies={this.props.cookies}
          handleChange={this.handleChange}
          handleSubmit={this.handleLinkFormSubmit}
          event={event}
          link={link}
          eventActions={eventActions}
          handleCancelEventAction={this.handleCancelEventAction}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  events: state.event,
  event: state.eventInfo,
  cookies: ownProps.cookies
})
export default connect(
  mapStateToProps,
  { fetchEventInfo, setLastLocation, postEventLink }
)(EventInfo)
