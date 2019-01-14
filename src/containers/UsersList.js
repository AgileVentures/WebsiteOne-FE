import React, { Component, Fragment, useState } from "react";
import { Header, Card, Grid } from "semantic-ui-react";
import Paginate from "../components/Paginate";
import PaginationLinks from "../components/PaginationLinks";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/getUsersAction";
import User from "../components/User";
import "../assets/UsersList.css";

const UsersList = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [usersList, setUsersList] = useState([]);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [pageCount, setPageCount] = useState(null);
  const [users, setUsers] = useState({});

  normalizeUsers = users => {
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
    setUsers(normalizedUsers);
    setUsersList(normalizedUsers[1]);
    setPageCount(pageCount)
    setLastPage(false)

  }

  handlePageSelect = selectedPage => e => {
    e.preventDefault();
    setSelectedPage(selectedPage)
    setUsersList(users[selectedPage])
    setFirstPage(selectedPage - 1 < 1 ? true : false)
    setLastPage(selectedPage + 1 > this.state.pageCount ? true : false)
  };
  
  return (
    <Fragment>
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
    </Fragment>
  )
}
  
  // componentDidMount() {
  //   if (!this.props.users.length) {
  //     this.props.fetchUsers();
  //   } else {
  //     this.normalizeUsers(this.props.users);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.users.length !== nextProps.users.length) {
  //     this.normalizeUsers(nextProps.users);
  //   }
  // }

const mapStateToProps = store => ({ users: store.users });
export default connect(
  mapStateToProps,
  { fetchUsers }
)(UsersList);
