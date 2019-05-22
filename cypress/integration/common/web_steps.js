import {
  Then,
  Given,
  When
} from 'cypress-cucumber-preprocessor/steps'

Given('the server is running', () => {
  cy.server()
})

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

When(`I click on the Users link in the navbar`, () => {
  cy.fixture('users').then(users => {
    cy.route(/\/api\/v1\/users/, users).as('getUsers')
    cy.get('a')
      .contains('Users')
      .click()
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'GET_USERS',
        payload: users
      })
  })
  cy.wait('@getUsers')
})

Then(`I should see {string} cards with basic user info`, (number) => {
  cy.get('h1')
    .should('contain', 'Volunteers Directory')
    .get('.user-card')
    .should('have.length', Number(number))
})

When(`I enter {string} into search bar`, name => {
  cy.get('input')
    .type(name)
})

When("I click on a user's name", () => {
  cy.fixture('user').then(user => {
    cy.route(/\/api\/v1\/users\/1/, user).as('getUser')
    cy.get('a')
      .contains(`${user.first_name} ${user.last_name}`)
      .click({
        force: true
      })
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'GET_USER_INFO',
        payload: user
      })
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
    .get('a')
    .contains('Bio')
    .get('.active')
    .should('contain', "Love programming, let's pair?")
    .get('a')
    .contains('Skills')
    .get('a')
    .contains('Projects')
    .get('a')
    .contains('Activity')
})

When(`I click on the Projects link in the navbar`, () => {
  cy.fixture('projects').then(projects => {
    cy.route(/\/api\/v1\/projects/, projects).as('getProjects')
    cy.get('a')
      .contains('Projects')
      .click()
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'GET_PROJECTS',
        payload: projects
      })
  })
  cy.wait('@getProjects')
})

Then(`I should see 12 cards with basic project info`, () => {
  cy.get('h1')
    .should('contain', 'List of Projects')
    .get('.project-card')
    .should('have.length', 12)
})

When("I click on the project's title", () => {
  cy.fixture('project').then(project => {
    cy.route(/\/api\/v1\/projects\/localsupport/, project).as('getProject')
    cy.get('div')
      .contains('LocalSupport')
      .click({
        force: true
      })
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'GET_PROJECT_INFO',
        payload: project
      })
  })
  cy.wait('@getProject')
  cy.reload()
})

Then("I should see the project's info", () => {
  cy.get('h1')
    .contains('LocalSupport')
    .get("a[href='https://www.pivotaltracker.com/n/projects/742821']")
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
})

When(`I click on the Events link in the navbar`, () => {
  cy.fixture('events').then(events => {
    events.map(event => {
      event.start = new Date()
      event.end = new Date()
      return event
    })
    cy.route(/\/events.json/, events).as('getEvents')
    cy.get('a')
      .contains('Events')
      .click()
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'GET_EVENTS',
        payload: events
      })
  })
  cy.wait('@getEvents')
})

Then('I should see a calendar with events', () => {
  cy.get('div').should('have.class', 'rbc-calendar')
})

When('I click on an event in the calendar', () => {
  cy.fixture('event').then(event => {
    cy.route(/\/api\/v1\/events\/katherine-johnson-scrum-and-pair-hookup/, event).as('getEvent')
    cy.get('.rbc-event-content')
      .contains("'Katherine Johson' Scrum")
      .click({
        force: true
      })
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'GET_EVENT_INFO',
        payload: event
      })
  })
  cy.wait('@getEvent')
})

Then("I should see the event's info", () => {
  cy.get('h2')
    .should('contain', "'Katherine Johnson' Scrum and Pair Hookup - All Welcome :-) Discuss Any Project, Ask Any Question, Or Just Listen In :-)")
    .get('p')
    .should('contain', 'Event type: Scrum')
    .get('p')
    .should('contain', 'Event for: All')
    .get('h5')
    .should('contain', 'Next scheduled event:')
    .get('img.ui.circular.image')
    .should('have.attr', 'src')
    .and('contain', 'https://www.gravatar.com/avatar/9249736dae1898d537770886061c06f9?s=32&d=retro')
    .get('p')
    .should('contain', 'created by:')
    .get('p')
    .should('contain', 'updated by:')
    .get('.event-info-videos')
    .within(() => {
      cy.get('div.embed').should('have.length', 1)
    })
})

Given('I am logged in', () => {
  cy.fixture('loggedInUser').then(loggedInUser => {
    cy.route({
      method: 'POST',
      url: /\/users\/sign_in/,
      response: loggedInUser,
      status: 200
    }).as('postLogInInfo')
    cy.visit('/login')
      .get('input[name=email]')
      .type('username@user.com')
      .get('input[name=password]')
      .type('user1234')
      .get('button[type=submit]')
      .click()
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'POST_LOGIN_INFO',
        payload: loggedInUser
      })
  })
  cy.wait('@postLogInInfo')
})

Then('I visit the new events page', () => {
  cy.fixture('activeProjects').then(activeProjects => {
    cy.route(/\/api\/v1\/projects\/active/, activeProjects).as('fetchActiveProjects')
    cy.visit('/events/new')
      .get('h1')
      .should('contain', 'Creating a new Event')
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_ACTIVE_PROJECTS', payload: activeProjects })
  })
  cy.wait('@fetchActiveProjects')
})

Then('I should be able to create a new event quickly', () => {
  cy.fixture('newlyCreatedEventInfo').then(newlyCreatedEventInfo => {
    cy.route({
      method: 'POST',
      url: /\/events/,
      response: newlyCreatedEventInfo,
      status: 200
    }).as('newlyCreatedEvent')
    cy.get('input[name=name]')
      .type('NewEvent')
      .get('button')
      .contains('Save')
      .click()
      .url().should('include', '/events/newevent')
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_EVENT_INFO', payload: newlyCreatedEventInfo })
  })
  cy.wait('@newlyCreatedEvent')
})

Then("I should see the newly created event's info", () => {
  cy.url().should('include', 'events/newevent')
    .get('h2')
    .should('contain', 'NewEvent')
    .get('p')
    .should('contain', 'Event type: PairProgramming')
    .get('p')
    .should('contain', 'Event for: All')
    .get('img.ui.circular.image')
    .should('have.attr', 'src')
    .get('p')
    .should('contain', 'created by:')
})

Then('I should be able to create a new project', () => {
  cy.fixture('newlyCreatedProjectInfo').then(newlyCreatedProject => {
    cy.route({
      method: 'POST',
      url: /\/projects/,
      response: newlyCreatedProject,
      status: 200
    }).as('newlyCreatedProject')
    cy.visit('/projects/new')
      .get('h1')
      .should('contain', 'Creating a new Project')
      .get('input[name=title]')
      .type('NewProject')
      .get('input[name=image_url]')
      .type('http://i.imgur.com/WPQcOUl.png')
      .get('textarea[name=description]')
      .type('A new project')
      .get('textarea[name= slack_channel_name]')
      .type('slack_channel_name')
      .get('button[type=submit]')
      .click()
      .url().should('include', '/projects/newproject')
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_PROJECT_INFO', payload: newlyCreatedProject })
  })
  cy.wait('@newlyCreatedProject')
})

When("I should be redirected to the project's info page", () => {
  cy.fixture('newlyCreatedProjectInfo').then(newlyCreatedProjectInfo => {
    cy.route(/\/api\/v1\/projects\/newproject/, newlyCreatedProjectInfo).as('getProject')
    cy.visit('/projects/newproject')
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'GET_PROJECT_INFO', payload: newlyCreatedProjectInfo })
  })
  cy.wait('@getProject')
})

Then("I should see the newly created project's info", () => {
  cy.url().should('include', 'projects/newproject')
    .get('h1')
    .should('contain', 'NewProject')
    .get('h5')
    .should('contain', 'A new project')
})
