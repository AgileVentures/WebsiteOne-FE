import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventInfo } from '../actions/getEventInfoAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Container } from 'semantic-ui-react'
import EventSummary from '../components/EventSummary'

export class EventInfo extends Component {
  state = { event: null };

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

  render () {
    let { event } = this.state
    return (
      <Container className='event-info-container'>
        <EventSummary cookies={this.props.cookies} event={event} />
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
