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

Given('I am at the projects page', () => {
  cy.server()
  cy.fixture('projects').then(projects => {
    cy.route(
      /https:\/\/develop\.websiteone\.agileventures\.org\/api\/v1\/projects/,
      projects
    ).as('getProjects')
    cy.visit('/projects')
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_PROJECTS', payload: projects })
  })
  cy.wait('@getProjects')
})

When('I click on the LocalSupport project', () => {
  cy.server()
  cy.fixture('project').then(project => {
    cy.route(/https:\/\/develop\.websiteone\.agileventures\.org\/api\/v1\/projects\/localsupport/, project).as('getProject')
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
