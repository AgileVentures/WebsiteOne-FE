import React, { Fragment } from 'react'
import { Header, Segment, Grid, Embed, Image, Icon } from 'semantic-ui-react'
import Custringloader  from './custringload'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment-timezone'

const EventSummary = props => {
  let { event } = props
  if (event) {
    let startTime = moment(event.nextScheduledEvent.time)
    let endTime = startTime.clone().add(Number(event.duration), 'minutes')
    let timeRange = `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}  ${moment.tz.guess()}`
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
            <Segment padded='very' vertical>
              <p>Event type: {event.category}</p>
              <p>Event for: {event.for}</p>
            </Segment>
            <Segment padded='very' vertical>
              <Grid columns={2} stackable>
                <Grid.Column width={8}>
                  <Header as='h5'>Next scheduled event:</Header>
                  <Icon name='calendar plus outline' size='large' />
                  {moment(event.nextScheduledEvent.time).format('MMMM Do YYYY')}
                  <br />
                  <br />
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
                      {event.modifier
                        ? (
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
          <Grid.Column width={4} className='event-info-videos'>
            {event.videos
              .filter(video => video.yt_video_id !== null)
              .map(video => (
                <Fragment key={video.id}>
                  <Embed
                    id={video.yt_video_id}
                    placeholder={
                      'https://img.youtube.com/vi/' +
                        video.yt_video_id +
                        '/3.jpg'
                    }
                    source='youtube'
                  />
                  <p>{video.title}</p>
                </Fragment>
              ))}
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  } else {
    return <Custringloader sizeUnit={'px'} size={200} color={'#34495E'} />
  }
}

export default EventSummary
