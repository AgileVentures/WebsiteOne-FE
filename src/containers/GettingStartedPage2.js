import React, { Component } from "react";
import CustomRingLoader from "../components/CustomRingLoader";
import { Container } from "semantic-ui-react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

export default class GettingStartedPage extends Component {
  state = { gettingStartedPage: null };

  componentDidMount() {
    axios.get("api/v1/static-pages/getting-started-2").then(response => {
      this.setState({ gettingStartedPage: response.data });
    });
  }

  render() {
    let { gettingStartedPage } = this.state;
    if (gettingStartedPage) {
      return (
        <Container>
          <div>{ReactHtmlParser(gettingStartedPage)}</div>
        </Container>
      );
    } else {
      return <CustomRingLoader />;
    }
  }
}
