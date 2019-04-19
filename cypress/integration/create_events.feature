Feature: Create new event
  Background:
    Given the server is running

  Scenario: Quick create
    Given I am logged in
    And I visit the new events page
    Then I should be able to create a new event quickly
    And I should see the newly created event's info
