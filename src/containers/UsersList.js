import React, { Component, Fragment } from "react";
<<<<<<< 4483b3b222a0faa1de30040e23a55fcb0e1a5133
import { Header, Card, Grid } from "semantic-ui-react";
=======
import { Header, Card } from "semantic-ui-react";
>>>>>>> Add pagination, user component
import Paginate from "../components/Paginate";
import PaginationLinks from "../components/PaginationLinks";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/getUsersAction";
import User from "../components/User";
import "../assets/UsersList.css";
export class UsersList extends Component {
  state = {
    firstPage: true,
    lastPage: true,
    pageCount: null,
    usersList: [],
    users: {},
    selectedPage: 1
  };

  componentDidMount() {
    if (!this.props.users.length) {
      this.props.fetchUsers();
    } else {
      this.normalizeUsers(this.props.users);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.users.length !== nextProps.users.length) {
      this.normalizeUsers(nextProps.users);
    }
  }

  normalizeUsers(users) {
    let pageCount = Math.ceil(users.length / 12);
    let normalizedUsers = {};
    let lastIndex = 0;

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1) {
        normalizedUsers[i] = users.slice(i - 1, i + 11);
        lastIndex = i + 11;
      } else {
        normalizedUsers[i] = users.slice(lastIndex, lastIndex + 12);
        lastIndex += 12;
      }
    }
    this.setState({
      users: normalizedUsers,
      pageCount,
      usersList: normalizedUsers[1],
      lastPage: false
    });
  }

  handlePageSelect = selectedPage => e => {
    e.preventDefault();
    this.setState({
      usersList: this.state.users[selectedPage],
      selectedPage,
      firstPage: selectedPage - 1 < 1 ? true : false,
      lastPage: selectedPage + 1 > this.state.pageCount ? true : false
    });
  };

  render() {
    let {
      firstPage,
      lastPage,
      pageCount,
      usersList,
      selectedPage
    } = this.state;
    return (
      <Fragment>
<<<<<<< 4483b3b222a0faa1de30040e23a55fcb0e1a5133
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header as="h1">Volunteers Directory</Header>
              <Card.Group centered itemsPerRow={3}>
                <Paginate
                  items={usersList}
                  Component={User}
                  pageCount={pageCount}
                />
              </Card.Group>
              <PaginationLinks
                handlePageSelect={this.handlePageSelect}
                firstPage={firstPage}
                lastPage={lastPage}
                pageCount={pageCount}
                selectedPage={selectedPage}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
=======
        <Header as="h1">Volunteers Directory</Header>
        <Card.Group centered itemsPerRow={3}>
          <Paginate items={usersList} Component={User} pageCount={pageCount} />
        </Card.Group>
        <PaginationLinks
          handlePageSelect={this.handlePageSelect}
          firstPage={firstPage}
          lastPage={lastPage}
          pageCount={pageCount}
          selectedPage={selectedPage}
        />
>>>>>>> Add pagination, user component
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({ users: store.users });
export default connect(
  mapStateToProps,
  { fetchUsers }
)(UsersList);
