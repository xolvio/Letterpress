Feature: Curate a Landing Page

  As an author
  I want to curate a landing page
  So that I can entice people to purchase my book

  Scenario: Author the header with markdown
    Given I have created a landing page with the following header markdown
          """
          #My Book

          ![Cover](/cover.jpg "Cover")

          *Learn how to write a book*

          [Preview](/preview "Preview Chapter") [Buy](/buy "Buy Book")
          """
    When  a user navigates to the landing page
    Then  they see the heading "My Book"
    And   they see the cover image from "/cover.jpg"
    And   they see the tag-line "Learn how to write a book"
    And   they can navigate to "Preview Chapter" at "/preview"
    And   they can navigate to "Buy Book" at "/buy"

  @dev
  Scenario: See the table of content
    Given I have created a landing page with the following header markdown
          """
          #My Book

          ![Cover](/cover.jpg "Cover")

          *Learn how to write a book*

          [Preview](/preview "Preview Chapter") [Buy](/buy "Buy Book")
          """
    Given I have created a chapter called "Holistic Agencies" with the description
          """
          How to get a sofa into a room it won't fit in.
          """
    And   I have created a chapter called "Forty Two" with the description
          """
          The answer to life, universe and everything.
          """
    When  a user navigates to the landing page
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
