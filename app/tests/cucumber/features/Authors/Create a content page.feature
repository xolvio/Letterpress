Feature: Create content page

  As an author
  I want to create a content page
  So that I sell it

  Scenario: Create a chapter
    Given I created a "chapter" called "My Chapter" at "/chapter-x" with the following markdown
    """
    ![Cover](/cover.jpg "Cover")

    *Learn how to do something*

    ##Look at this

    [Preview](/preview "Preview Chapter") [Buy](/buy "Buy Content")
    """
    When  a visitor navigates to the page
    Then  they see the heading "My Chapter"
    Then  they see the sub-heading "Look at this"
    And   they see the cover image from "/cover.jpg"
    And   they see the tag-line "Learn how to do something"
    And   they can navigate to "Preview Chapter" at "/preview"
    And   they can navigate to "Buy Content" at "/buy"

  Scenario: Show visitors a preview video
    Given I uploaded a preview video called "http://a.cdn.io/my-preview"
    And I created a "video-chapter" called "My Cast" at "/cast-x" with the following markdown
    """
    This video above talk about this and that.
    """
    When a visitor navigates to the page
    Then they should see the preview video in the video player

  Scenario: Create a premium video chapter
    Given I uploaded a premium video called "/meteor-testing/day2.mp4"
    And I created a "video-chapter" called "My Cast" at "/cast-x" with the following markdown
    """
    This video above talk about this and that.
    """
    When a user navigates to the page
    Then they should see the premium video in the video player
    And the video should link should expire after the time I preset
