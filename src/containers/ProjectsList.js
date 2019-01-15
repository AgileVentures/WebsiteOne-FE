import React, { Component, Fragment } from 'react'
import { Header } from 'semantic-ui-react'
import Paginate from '../components/Paginate'
import PaginationLinks from '../components/PaginationLinks'
export default class ProjectsList extends Component {
  state = { firstPage: true, lastPage: true }

  handlePageSelect = selectedPage => e => {
    e.preventDefault()
    this.setState({
      selectedPage,
      firstPage: selectedPage - 1 < 1,
      lastPage: selectedPage + 1 > this.state.pageCount
    })
  }

  render () {
    let { firstPage, lastPage } = this.state
    return (
      <Fragment>
        <Header as='h1'>List of Projects</Header>
        <Paginate items={[]} />
        <PaginationLinks
          handlePageSelect={this.handlePageSelect}
          firstPage={firstPage}
          lastPage={lastPage}
        />
      </Fragment>
    )
  }
}
