import { Then, Given, When } from 'cypress-cucumber-preprocessor/steps'

Then(`I should see {string}`, textToFind => {
  cy.contains(textToFind)
})

Given(`I am at the {string} page`, pageName => {
  if (pageName === 'Home') {
    cy.visit('/')
  } else {
    cy.visit('/' + pageName)
  }
})

When(`I click on the {string} link in the navbar`, link => {
  cy.server()
  cy.fixture('users').then(users => {
    cy.route(
      /\/api\/v1\/users/,
      users
    ).as('getUsers')
    cy.get('a')
      .contains(link)
      .click()
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_USERS', payload: users })
  })
  cy.wait('@getUsers')
})

When("I click on a user's name", () => {
  cy.server()
  cy.fixture('user').then(user => {
    cy.route(/\/api\/v1\/users\/1/, user).as('getUser')
    cy.get('a')
      .contains(`${user.first_name} ${user.last_name}`)
      .click({ force: true })
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_USER_INFO', payload: user })
  })
  cy.wait('@getUser')
})

Then("I should see the user's info", () => {
  cy.get('.user-profile-card')
    .should('contain', 'Matt Tester')
    .get('.user-profile-karma')
    .should('contain', '108')
    .get('a')
    .should('contain', 'mattwr18@gmail.com')
    .get('a').contains('Bio')
    .get('.active')
    .should('contain', "Love programming, let's pair?")
    .get('a').contains('Skills')
    .get('a').contains('Projects')
    .get('a').contains('Activity')
})

Given('I am at the projects page', () => {
  cy.server()
  cy.fixture('projects').then(projects => {
    cy.route(
      /\/api\/v1\/projects/,
      projects
    ).as('getProjects')
    cy.visit('/projects')
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_PROJECTS', payload: projects })
  })
  cy.wait('@getProjects')
})

Then(`I should see 12 cards with basic user info`, () => {
  cy.get('h1')
    .should('contain', 'Volunteers Directory')
    .get('.user-card')
    .should('have.length', 12)
})

Then(`I should see 12 cards with basic project info`, () => {
  cy.get('h1')
    .should('contain', 'List of Projects')
    .get('.project-card')
    .should('have.length', 12)
})

When('I click on the LocalSupport project', () => {
  cy.server()
  cy.fixture('project').then(project => {
    cy.route(/\/api\/v1\/projects\/localsupport/, project).as('getProject')
    cy.get('div')
      .contains('LocalSupport')
      .click({ force: true })
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_PROJECT_INFO', payload: project })
  })
  cy.wait('@getProject')
  cy.reload()
})

Then("I should be on the LocalSupport Project's info page", () => {
  cy.get('h1').contains('LocalSupport')
})

Then(
  'I should see the tracker link, the github repositories links, a small description, a members list, and a video wall',
  () => {
    cy.get("a[href='https://www.pivotaltracker.com/n/projects/742821']")
      .get("a[href='https://github.com/AgileVentures/LocalSupport/']")
      .get('div.segment > h5')
      .contains("VAH's Local Support site is at  www.harrowcn.org.uk")
      .get('div')
      .contains('Members')
      .get('div.row > img')
      .should('have.length', 5)
      .get('.project-info-videos')
      .within(() => {
        cy.get('div.embed').should('have.length', 5)
      })
  }
)
