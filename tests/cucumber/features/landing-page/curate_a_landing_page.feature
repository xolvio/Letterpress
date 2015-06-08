Feature: Curate a Landing Page

  As an author
  I want to curate a landing page
  So that I can entice people to purchase my book

  @dev
  Scenario: Author the header with markdown
    Given I have created a landing page with the following header markdown
    """
    #My Book

    ![Cover](/cover.jpg "Cover")

    *Learn how to write a book*

    [Preview Chapter](/preview "See a Preview") [Buy Now](/buy "Buy the Book")

    """
    When a user navigates to the landing page
    Then they see the heading "My Book"
    And  they see the cover image from "/cover.jpg"
    And  they see the tag-line "Learn how to write a book"
    And  they can navigate to "See a Preview" at "/preview"
    And  they can navigate to "Buy the Book" at "/buy"