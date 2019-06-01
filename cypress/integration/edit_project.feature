Feature: Edit project
  Background:
    Given the server is running

  Scenario: Editing a project
    Given I click on edit button on a project's info page
    Then I should be redirected to the edit project page
    Then I should see edit project page fields populated with existing project info
    Then I should be able to edit project fields
    Then I should be able to submit edits
    Then I should be redirected to project's info page
    Then I should see project's info updated
