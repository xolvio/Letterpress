Feature: Pay using Stripe

  As an author
  I want to connect my stripe account
  So that I can get paid

  Background: Setup Stripe
    Given I have configured a Stripe account
    And   I have created content

  @dev
  Scenario: Set up a subscription plan
    Given I have set my payment plan to be subscription
    When a user pays using Stripe
    Then they see a confirmation screen of their subscription
    And receive a confirmation email of their subscription

  @ignore
  Scenario: One-time purchase
    Given I have set my payment plan to be one-time purchase
    When a user pays using Stripe
    Then they see a confirmation screen of their one-time purchase
    And they receive a confirmation email of their one-time purchase