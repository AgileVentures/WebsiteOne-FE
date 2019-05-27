import React, { Component, Fragment } from 'react'
import { Card, Header, Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchProjects } from '../actions/getProjectsAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import Project from '../components/Project'
import Paginate from '../components/Paginate'
import PaginationLinks from '../components/PaginationLinks'
import ErrorBoundary from '../components/ErrorBoundary'
import NewButton from '../components/NewButton'
import '../assets/LogIn.scss'
import '../assets/ProjectsList.css'

const projectsPerPage = 12
export class ProjectsList extends Component {
  state = {
    firstPage: true,
    lastPage: true,
    pageCount: null,
    projectsList: [],
    projects: {},
    selectedPage: 1,
    filteredProjectsList: null,
    filteredProjects: {},
    totalProjects: null,
    selectedLanguage: null,
    languages: [],
    error: false
  };

  componentDidMount = async () => {
    if (!this.props.projects.length) {
      await this.props.fetchProjects()
      if (this.props.error) {
        this.setState({ error: true })
      }
    } else {
      this.paginateProjects(this.props.projects)
    }
    this.props.setLastLocation(this.props.location.pathname)
  }

  componentWillReceiveProps (nextProps) {
    if (
      this.props.projects.length !== nextProps.projects.length &&
      !nextProps.projects[0].error
    ) {
      this.paginateProjects(nextProps.projects)
    }
  }

  paginateProjects (projects) {
    let pageCount = Math.ceil(projects.length / projectsPerPage)
    let paginatedProjects = {}
    let lastIndex = 0

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1) {
        paginatedProjects[i] = projects.slice(i - 1, i + 11)
        lastIndex = i + 11
      } else {
        paginatedProjects[i] = projects.slice(lastIndex, lastIndex + 12)
        lastIndex += 12
      }
    }

    this.addLanguagesToProjectsObject(projects, paginatedProjects)

    this.setState({
      projects: paginatedProjects,
      pageCount,
      projectsList: paginatedProjects[1],
      totalProjects: projects.length,
      lastPage: false
    })
  }

  addLanguagesToProjectsObject (projects, paginatedProjects) {
    let languages = new Set()
    projects.forEach(project => {
      if (project.languages.length) {
        return project.languages.forEach(languages.add, languages)
      }
    });

    [...languages].forEach(lang => {
      let filteredProjects = projects.filter(project =>
        project.languages.includes(lang)
      )
      this.paginateProjectsByLanguage(
        filteredProjects,
        lang,
        paginatedProjects
      )
    })
    this.setState({ languages: [...languages] })
  }

  paginateProjectsByLanguage = (items, lang, paginatedProjects) => {
    let lastIndex = 0
    let pageCount = [
      ...Array(Math.floor(items.length / projectsPerPage + 1)).keys()
    ]
    paginatedProjects[lang] = pageCount.reduce((acc, next) => {
      if (next === 0) {
        acc = { [next + 1]: items.slice(next, next + 12) }
        lastIndex = next + 12
        return acc
      } else {
        acc[next + 1] = items.slice(lastIndex, lastIndex + 12)
        lastIndex = next + 12
        return acc
      }
    }, {})
  };

  populateLanguagesDropdown () {
    return this.state.languages.map(lang => ({ label: lang, value: lang }))
  }

  handleFilterProjects = selectedLanguage => {
    let { projects } = this.state
    if (selectedLanguage) {
      let pageCount = Object.keys(this.state.projects[selectedLanguage.value])
        .length
      this.setState({
        selectedLanguage,
        filteredProjectsList: projects[selectedLanguage.value][1],
        pageCount,
        firstPage: true,
        lastPage: !(pageCount > 1)
      })
    } else {
      let pageCount = Math.ceil(this.props.projects.length / projectsPerPage)
      this.setState({
        selectedLanguage: null,
        pageCount,
        selectedPage: 1,
        filteredProjectsList: null,
        firstPage: true,
        lastPage: !(pageCount > 1)
      })
    }
  };

  handlePageSelect = selectedPage => e => {
    e.preventDefault()
    let { selectedLanguage, projects } = this.state
    this.setState({
      selectedPage,
      firstPage: selectedPage - 1 < 1,
      lastPage: selectedPage + 1 > this.state.pageCount
    })
    if (selectedLanguage) {
      this.setState({
        filteredProjectsList: projects[selectedLanguage.value][selectedPage]
      })
    } else {
      this.setState({ projectsList: projects[selectedPage] })
    }
  };

  render () {
    const {
      projectsList,
      filteredProjectsList,
      selectedLanguage,
      pageCount,
      error
    } = this.state

    return (
      <Fragment>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column floated='left' width={9}>
                      <Header className='projects-list-header' as='h1'>
                      List of Projects
                      </Header>
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                      <NewButton href='/projects/new' content='New Project!' iconId='new-proj-icon' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <div>
                  <p>
                  To get involved in any of the projects, join one of the
                    <Link to={`/events`}> scrums </Link>and reach out to us, or
                  send us an email at
                    <a href='mailto:info@agileventures.org'>
                      {' '}
                    info@agileventures.org
                    </a>
                  .
                  </p>
                </div>
                <div className='search-dropdown'>
                  <Select
                    value={selectedLanguage}
                    options={this.populateLanguagesDropdown()}
                    onChange={this.handleFilterProjects}
                    placeholder='Search for project by programming language...'
                    isClearable
                  />
                </div>
                <Card.Group centered itemsPerRow={3}>
                  <Paginate
                    items={filteredProjectsList || projectsList}
                    Component={Project}
                    pageCount={pageCount}
                    error={error ? <ErrorBoundary /> : false}
                  />
                </Card.Group>
                {!(pageCount === 1) ? (
                  <PaginationLinks
                    pageCount={pageCount}
                    selectedPage={this.state.selectedPage}
                    handlePageSelect={this.handlePageSelect}
                    firstPage={this.state.firstPage}
                    lastPage={this.state.lastPage}
                  />
                ) : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({ projects: state.projects, error: state.error })
export default connect(
  mapStateToProps,
  { fetchProjects, setLastLocation }
)(ProjectsList)
