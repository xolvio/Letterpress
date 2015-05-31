Feature: Curate a Landing Page

  As an author
  I want to curate a landing page
  So that I can entice people to purchase my book

  @dev
  Scenario: Author the heading
    Given I have created a landing page with the heading "My Book"
    When a user navigates to the landing page
    Then they see the heading "My Books"