Feature: Discuss premium content

  As a user
  I want to discuss content
  So that I can get what I paid for

  Background: Author created a page
    Given An author has created content

  Scenario: authenticated user can view a video page
    Given I have signed up
    And I have logged in
    When I navigate to the private content page
    And I can join the discussion about the private content

  Scenario: unregistered users can purchase a subscription
    Given I am not logged in
    When I navigate to the private content page
    And I cannot join the discussion about the private content