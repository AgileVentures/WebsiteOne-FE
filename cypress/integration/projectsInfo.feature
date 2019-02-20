Feature: Project's info page

  Scenario: Access a Project's info page
    Given I am at the "projects" page
    When I click on the LocalSupport project
    Then I should be on the LocalSupport Project's info page
    And I should see the tracker link, the github repositories links, a small description, a members list, and a video wall
