import { Then, Given } from 'cypress-cucumber-preprocessor/steps'

Then(`I should see {string}`, (textToFind) => {
  cy.contains(textToFind)
})

Given(`I am at the {string} page`, (pageName) => {
  if(pageName === "Home") {
    cy.visit('/')
  } else {
    cy.fail('unknown page \'' + pageName + '\'')
  }
})