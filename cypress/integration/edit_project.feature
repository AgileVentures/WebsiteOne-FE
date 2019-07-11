Feature: Edit project
  Background:
    Given the server is running
    Given I am logged in

  Scenario: Editing a project
    Given Edit button on project info page is clicked
    Then I should be redirected to the edit project page
    Then I should see edit project page fields populated with existing project info
    Then I should be able to edit project fields
    Then I should be able to submit edits
