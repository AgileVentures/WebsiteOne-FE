Feature: Create new event
  Background:
    Given the server is running

  Scenario: Quick create
    Given I am logged in
    Then I should be able to create a new event quickly
    And I should be on the newly created event's page
