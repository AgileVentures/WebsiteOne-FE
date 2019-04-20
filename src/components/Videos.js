import React, { Fragment } from 'react'
import { Grid, Embed } from 'semantic-ui-react'

const Videos = (props) => {
  return (
    <Grid.Column width={4} className={props.id}>
      {props.name.videos
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
  )
}
export default Videos
