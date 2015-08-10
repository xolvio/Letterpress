Feature: View premium content

  As a user
  I want to view a page with private content
  So that I can get what I paid for

  Background: Author created a page
    Given An author has created content

  Scenario: authenticated user can view a video page
    Given I have signed up
    And I have logged in
    When I navigate to the private content page
    And I can see my premium content

  Scenario: registered users can login to see private content
    Given I have signed up
    And I am not logged in
    When I navigate to the private content page
    And I login
    Then I can see my premium content

  Scenario: registered users can repurchase a subscription
    Given I am not logged in
    When I navigate to the private content page
    And I see a "Buy Now" button
    And I cannot not see premium content
