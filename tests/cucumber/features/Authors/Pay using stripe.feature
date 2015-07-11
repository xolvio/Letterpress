Feature: Pay using Stripe

  As an author
  I want to connect my stripe account
  So that I can get paid

  Background: Setup Stripe
    Given I have configured a Stripe account
    And   I have created content

  Scenario: Set up a subscription plan
    Given I have setup a "subscribe" payment plan
    When a user pays using Stripe
    Then they see a confirmation screen of their "subscribe" purchase
    And receive a confirmation email of their "subscribe" purchase

  Scenario: Setup a charge purchase
    Given I have setup a "charge" payment plan
    When a user pays using Stripe
    Then they see a confirmation screen of their "charge" purchase
    And receive a confirmation email of their "charge" purchase
