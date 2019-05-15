import React, { Component } from 'react'
import { fetchEventInfo } from '../actions/getEventInfoAction'
import { connect } from 'react-redux'
import CustomRingLoader from '../components/CustomRingLoader'
import EventForm from '../components/EventForm'
class EditEventPage extends Component {
  componentDidMount () {
    this.props.fetchEventInfo()
  }
  handleChange (e, { name, value }) {
  };
  handleStartDateChange = date => {
  };
  handleEndDateChange = date => {
  };
  handleSubmit= event => {
  };
  render () {
    let { eventInfo } = this.props
    return (
      !eventInfo.slug
        ? <CustomRingLoader />
        : <div>
          <EventForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            {...eventInfo}
          />
        </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      eventInfo: state.eventInfo
    }
  }
  ,
  (dispath, ownProps) => {
    let { slug } = ownProps.match.params
    return {
      fetchEventInfo: () => dispath(fetchEventInfo(slug))
    }
  }
)(EditEventPage)
