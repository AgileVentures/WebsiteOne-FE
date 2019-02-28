Feature: Journey test

  Background:
    Given the server is running

  Scenario: Access the website
    Given I am at the "Home" page
    Then I should see "Scrums"
    When I click on the Users link in the navbar
    Then I should see 12 cards with basic user info
    When I click on a user's name
    Then I should see the user's info
    When I click on the Projects link in the navbar
    Then I should see 12 cards with basic project info
    When I click on the project's title
    Then I should see the project's info
    When I click on the Events link in the navbar
    Then I should see a calendar with events
    When I click on an event in the calendar
    Then I should see the event's info
