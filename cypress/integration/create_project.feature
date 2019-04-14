Feature: Create new project
  Background:
    Given the server is running

  Scenario: Creating a new project
    Given I am logged in
    Then I should be able to create a new project
    # And I should be redirected to the project's info page
    # And I should see the newly created project's info
