import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventInfo } from '../actions/getEventInfoAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { postEventLink } from '../actions/postEventLinkAction'
import { Container } from 'semantic-ui-react'
import EventSummary from '../components/EventSummary'

export class EventInfo extends Component {
  state = {
    event: null,
    link: '',
    linkError: false
  };

  componentDidMount() {
    const eventSlug = this.props.match.params.slug
    this.props.setLastLocation(this.props.location.pathname)
    if (this.props.event.slug === this.props.match.params.slug) {
      this.setState({ event: this.props.event })
    } else {
      this.props.fetchEventInfo(eventSlug)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.event !== nextProps.event) {
      this.setState({ event: nextProps.event })
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleLinkFormSubmit = e => {
    e.preventDefault()
    if (this.state.link === '') {
      this.setState({ linkError: true })
    }
    const { id, name, slug } = this.props.event
    this.props.postEventLink({ id, title: name, slug, link: this.state.link })
  };

  render() {
    let { event } = this.state
    return (
      <Container className='event-info-container'>
        <EventSummary
          cookies={this.props.cookies}
          handleChange={this.handleChange}
          handleSubmit={this.handleLinkFormSubmit}
          value={this.state.link}
          error={this.state.linkError}
          event={event}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  events: state.event,
  event: state.eventInfo
})
export default connect(
  mapStateToProps,
  { fetchEventInfo, setLastLocation, postEventLink }
)(EventInfo)
