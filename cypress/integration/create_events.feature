Feature: Create new event
  Background:
    Given the server is running

  Scenario: Creating a new event
    Given I am logged in
    Then I should be able to create new events