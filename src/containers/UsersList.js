import React, { Component, Fragment, useState, useEffect } from "react";
import { Header, Card, Grid } from "semantic-ui-react";
import Paginate from "../components/Paginate";
import PaginationLinks from "../components/PaginationLinks";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/getUsersAction";
import User from "../components/User";
import "../assets/UsersList.css";

const UsersList = props => {
  const [selectedPage, setSelectedPage] = useState(1)
  const [usersList, setUsersList] = useState([])
  const [firstPage, setFirstPage] = useState(true)
  const [lastPage, setLastPage] = useState(true)
  const [pageCount, setPageCount] = useState(null)
  const [users, setUsers] = useState({})
  
  useEffect(() => {
      if (!props.users.length) {
        props.fetchUsers()
      } else {
        paginateUsers(props.users)
      }
  }, [props.users])

  const paginateUsers = users => {
    let pageCount = Math.ceil(users.length / 12);
    let paginatedUsers = {};
    let lastIndex = 0;

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1) {
        paginatedUsers[i] = users.slice(i - 1, i + 11);
        lastIndex = i + 11;
      } else {
        paginatedUsers[i] = users.slice(lastIndex, lastIndex + 12);
        lastIndex += 12;
      }
    }
    setUsers(paginatedUsers);
    setUsersList(paginatedUsers[1]);
    setPageCount(pageCount)
    setLastPage(false)
  }

  const handlePageSelect = selectedPage => event => {
    event.preventDefault();
    setSelectedPage(selectedPage)
    setUsersList(users[selectedPage])
    setFirstPage(selectedPage - 1 < 1 ? true : false)
    setLastPage(selectedPage + 1 > pageCount ? true : false)
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
              handlePageSelect={handlePageSelect}
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

const mapStateToProps = store => ({ users: store.users })
export default connect(
  mapStateToProps,
  { fetchUsers }
)(UsersList)
