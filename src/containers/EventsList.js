import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchEvents } from '../actions/getEventsAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Container, Header } from 'semantic-ui-react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../assets/eventsList.css'

export class EventsList extends Component {
  componentDidMount () {
    if (!this.props.events.length) {
      this.props.fetchEvents()
    }
  }

  handleSelectEvent = event => {
    this.props.history.push(`/events/${event.slug}`)
  }

  render () {
    let { events } = this.props
    const localizer = BigCalendar.momentLocalizer(moment)
    return (
      <Fragment>
        <Container>
          <Header as='h1'>AgileVentures Events</Header>
          <BigCalendar
            localizer={localizer}
            events={events}
            views={['week', 'month', 'day']}
            defaultView={BigCalendar.Views.WEEK}
            onSelectEvent={this.handleSelectEvent}
          />
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({ events: store.events })
export default connect(
  mapStateToProps,
  { fetchEvents, setLastLocation }
)(EventsList)
