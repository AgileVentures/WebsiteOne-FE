import React, { Component, Fragment } from "react";
import EventForm from "../components/EventForm";
import axios from "axios";

export class EditEventPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: null,
      startDate: new Date(),
      endDate: new Date(),
      name: "",
      category: "PairProgramming",
      eventFor: "All",
      projectId: 64,
      description: "",
      timezones: momentTZ.tz.guess(),
      duration: 30,
      repeats: "never",
      weekdays: [],
      repeatEnds: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/events" + this.props.match.params.id)
      .then(response => {
        this.setState({
          projects: response.data.projects,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          name: response.data.name,
          category: response.data.category,
          eventFor: response.data.eventFor,
          projectId: response.data.projectId,
          description: response.data.description,
          timezones: response.data.timezones,
          duration: response.data.duration,
          repeats: response.data.repeats,
          weekdays: response.data.weekdays,
          repeatEnds: response.data.repeatEnds
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  render (){
      return(
        <Fragment>
        <Header as='h1' textAlign='center'>
          Edit Event
        </Header>
        <EventForm
        //   handleSubmit={this.handleSubmit}
        //   handleChange={this.handleChange}
        //   handleStartDateChange={this.handleStartDateChange}
        //   handleEndDateChange={this.handleEndDateChange}
          name={name}
          category={category}
          eventFor={eventFor}
          projectId={projectId}
          description={description}
          startDate={startDate}
          timezones={timezones}
          duration={duration}
          repeats={repeats}
          weekdays={weekdays}
          repeatEnds={repeatEnds}
          endDate={endDate}
        />
      </Fragment>
      );
  }
}
