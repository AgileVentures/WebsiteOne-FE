import React, { Fragment } from 'react'
import { Header, Segment, Grid, Embed, Image, Icon } from 'semantic-ui-react'
import { RingLoader } from 'react-spinners'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'

const EventSummary = props => {
  let { event } = props
  if (event) {
    return (
      <Fragment>
        <Grid columns={2} stackable>
          <Grid.Column width={12}>
            <Header as='h2'>{event.name}</Header>
            <Segment padded='very' raised>
              <Header as='h5'>{ReactHtmlParser(event.description)}</Header>
            </Segment>
            <p>Event type: {event.category}</p>
            <p>Event for: {event.for}</p>
            <Grid columns={2} stackable>
              <Grid.Column>
                <Image src={event.creatorGravatarUrl} circular />
                <p>created by: {} </p>
                <p>{event.creator}</p>
              </Grid.Column>
              {event.modifier
                ? (<Grid.Column>
                  <Image src={event.modifierGravatarUrl} circular />
                  <p>updated by:</p>
                  <p>{event.modifier}</p>
                </Grid.Column>) : null}
            </Grid>
            <Header as='h5'>Next scheduled event:</Header>
            <Icon name='calendar plus outline' size='large' />
            {moment(event.nextScheduledEvent.time).format('MMMM Do YYYY, h:mm:ss a')}
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
    return <RingLoader sizeUnit={'px'} size={200} color={'#34495E'} />
  }
}

export default EventSummary
