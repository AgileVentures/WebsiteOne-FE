Feature: Edit event
    Background: 
        Given the server is running
Scenario: Edit event
    Given I am logged in
    And I visit event details page
    And I click on the edit event link
    And I change name into "test" and description into "this is a test"