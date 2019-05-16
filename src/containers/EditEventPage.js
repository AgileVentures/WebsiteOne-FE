import React, { Component } from 'react'
import { fetchEventInfo } from '../actions/getEventInfoAction'
import { connect } from 'react-redux'
import CustomRingLoader from '../components/CustomRingLoader'
import EventForm from '../components/EventForm'
class EditEventPage extends Component {
  constructor (props) {
    super(props)
    this.state = { event: null }
  }
  componentDidMount () {
    this.props.fetchEventInfo()
  }
  componentDidUpdate (prevprops) {
    if (this.props.eventInfo.slug && !this.state.slug) {
      this.setState({ ...this.props.eventInfo })
    }
  }
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };
  handleStartDateChange = date => {
    this.setState({ startDate: date })
  };
  handleEndDateChange = date => {
    this.setState({ endDate: date })
  };
  handleSubmit= event => {
  };
  render () {
    let { slug } = this.state
    return (
      slug == null
        ? <CustomRingLoader />
        : <div>
          <EventForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            {...this.state}
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
