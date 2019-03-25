import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchEvents } from '../actions/getEventsAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Container, Header, Grid, Popup, Icon, Button } from 'semantic-ui-react'
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
          <Grid>
            <Grid.Row>
              <Grid.Column width={14}>
                <Header as='h1'>
                 AgileVentures Events
                </Header>
              </Grid.Column>
              <Grid.Column width={1}>
                <a href='events/new'>
                  <Popup
                    position='right center'
                    trigger={
                      <Button basic style={{ marginTop: '25px' }}>
                        <Icon name='plus' id='new-event-icon' />
                      </Button>
                    }
                    content='New Event!'
                  />
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>

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
