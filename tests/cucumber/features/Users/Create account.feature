Feature: Create account
  
  As a paying user
  I want to authenticate
  So that I can access the content I paid for
  
  Scenario: Receive link after payment
    Given I just paid for content
    And I received a confirmation email
    When I click the account creation link in my email
    Then I am able to create my account
    And I am able to access my content
  
  Scenario: Receive link after payment
    Given I have already created an account
    When I login with my username and password
    Then I am able to access my content