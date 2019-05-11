import React, { Fragment } from 'react'
import { Header, Segment, Grid, Image, Icon, Dropdown } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment-timezone'
import CustomRingLoader from './CustomRingLoader'
import Videos from './Videos'
import SingleFieldForm from './SingleFieldForm'
import '../assets/SingleFieldForm.css'

const eventActionsOptions = [
  {
    key: 'Edit Hangout link',
    text: 'Edit Hangout link',
    value: 'Edit Hangout link'
  }
]

const EventSummary = props => {
  let {
    event,
    cookies,
    link,
    handleChange,
    handleSubmit,
    eventActions,
    handleCancelEventAction
  } = props
  if (event) {
    let startTime = moment(event.start_datetime)
    let endTime = startTime.clone().add(Number(event.duration), 'minutes')
    let timeRange = `${startTime.format('HH:mm')} - ${endTime.format(
      'HH:mm'
    )}  ${moment.tz.guess()}`
    return (
      <Fragment>
        <Grid columns={2} stackable>
          <Grid.Column width={12}>
            <Segment vertical>
              <Header as='h2'>{event.name}</Header>
            </Segment>
            <Segment padded='very' vertical>
              <Header as='h5'>{ReactHtmlParser(event.description)}</Header>
            </Segment>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Segment padded='very' vertical>
                    <p>Event type: {event.category}</p>
                    <p>Event for: {event.for}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Segment padded='very' vertical>
                    {cookies.get('WebsiteOne_session') ? (
                      <Dropdown
                        placeholder='Event Actions'
                        name='eventActions'
                        fluid
                        selection
                        options={eventActionsOptions}
                        onChange={handleChange}
                      />
                    ) : null}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <SingleFieldForm
              label='Hangout Link'
              placeholder='Hangout Link'
              name='link'
              value={link}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              eventActions={eventActions ? undefined : 'hide-form'}
              cancelEventAction={handleCancelEventAction}
            />
            <Segment padded='very' vertical>
              <Grid columns={2} stackable>
                <Grid.Column width={8}>
                  {event.nextScheduledEvent ? (
                    <Fragment>
                      <Header as='h5'>Next scheduled event:</Header>
                      <Icon name='calendar plus outline' size='large' />
                      {moment(event.nextScheduledEvent.time).format(
                        'MMMM Do YYYY'
                      )}
                      <br />
                      <br />
                    </Fragment>
                  ) : null}
                  <Icon name='clock outline' size='large' />
                  {timeRange}
                </Grid.Column>
                <Grid.Column width={8}>
                  <Grid columns={2} stackable>
                    <Grid.Column>
                      <Image src={event.creatorGravatarUrl} circular />
                      <p>created by:</p>
                      <p>{event.creator}</p>
                    </Grid.Column>
                    <Grid.Column>
                      {event.modifier ? (
                        <Fragment>
                          <Image src={event.modifierGravatarUrl} circular />
                          <p>updated by:</p>
                          <p>{event.modifier}</p>
                        </Fragment>
                      ) : null}
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
          <Videos name={event} id='event-info-videos' />
        </Grid>
      </Fragment>
    )
  } else {
    return <CustomRingLoader />
  }
}

export default EventSummary
