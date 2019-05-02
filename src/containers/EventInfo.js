import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventInfo } from '../actions/getEventInfoAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Container } from 'semantic-ui-react'
import EventSummary from '../components/EventSummary'

export class EventInfo extends Component {
  componentDidMount () {
    const eventSlug = this.props.match.params.slug
    this.props.setLastLocation(this.props.location.pathname)
    if (this.props.event.slug === this.props.match.params.slug) {
      this.setState({ event: this.props.event })
    } else {
      this.props.fetchEventInfo(eventSlug)
    }
  }

  render () {
    return (
      <Container className='event-info-container'>
        <EventSummary event={this.props.event} />
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
  { fetchEventInfo, setLastLocation }
)(EventInfo)
