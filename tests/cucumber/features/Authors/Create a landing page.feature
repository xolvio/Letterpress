Feature: Create a Landing Page

  As an author
  I want to create a landing page
  So that I can entice people to purchase my content

  Scenario: See the table of content
    Given I created a landing page
    Given I have created a chapter called "Holistic Agencies" with the description
          """
          How to get a sofa into a room it won't fit in.
          """
    And   I have created a chapter called "Forty Two" with the description
          """
          The answer to life, universe and everything.
          """
    When  a visitor navigates to the page
    Then  they see the chapter "Holistic Agencies" in the table of contents with the description
          """
          How to get a sofa into a room it won't fit in.
          """
    And   they can navigate to "Holistic Agencies" at "holistic-agencies"
    And   they see the chapter "Forty Two" in the table of contents with the description
          """
          The answer to life, universe and everything.
          """
    And   they can navigate to "Forty Two" at "forty-two"
