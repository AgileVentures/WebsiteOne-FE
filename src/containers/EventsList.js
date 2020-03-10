import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Grid } from 'semantic-ui-react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { Query } from 'react-apollo'
import { setLastLocation } from '../actions/setLastLocationAction'
import { GET_EVENTS } from '../graphql/Event'
import NewButton from '../components/NewButton'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../assets/eventsList.css'

export class EventsList extends Component {
  handleSelectEvent = event => {
    this.props.history.push(`/events/${event.slug}`)
  }

  render () {
    const localizer = BigCalendar.momentLocalizer(moment)
    return (
      <Fragment>
        <Query query={GET_EVENTS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error :(</div>
            let end
            const events = data.events.map(event => {
              event.title = event.name
              event.start = new Date(event.startDatetime)
              end = moment(new Date(event.startDatetime)).add('minutes', event.duration)
              event.end = new Date(end)
              return event
            })
            return (
              <Container>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={14}>
                      <Header as='h1'>
                      AgileVentures Events
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={1}>
                      <NewButton href='/events/new' content='New Event!' iconId='new-event-icon' />
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
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({ events: state.events })
export default connect(
  mapStateToProps,
  {  setLastLocation }
)(EventsList)
