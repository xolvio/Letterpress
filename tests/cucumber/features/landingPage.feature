Feature: Authorable Landing Page

  As an author
  I want to curate a landing page
  So that I can entice people to purchase my book

  Scenario: Visitors can see a book heading
    Given The setting with key "public.book.title" and value "Letterpress by Xolv.io" has been set
    And I am a new visitor
    When I navigate to the landing page
    Then I see the heading "Letterpress by Xolv.io"

  Scenario: Visitors can sign up for the email list
    Given I navigate to the landing page
    When I sign up for the newsletter with "me@example.com"
    Then I receive a confirmation email from "letterpress@xolv.io"

  Scenario: Visitors can see chapter descriptions
    Given I have entered chapter preview descriptions
    When I navigate to the landing page
    Then I see the chapters descriptions in the preview section
    And the chapters are in order

  Scenario: Visitors can click through to a chapter preview
    Given I navigate to the landing page
    When I click on the chapter link
    Then I should be at the chapter preview page
