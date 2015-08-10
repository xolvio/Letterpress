Feature: Setup a subscription

  As an author
  I want to configure subscriptions
  So that I can get paid for my content

  Background: Setup Stripe
    Given I have configured a Stripe account
    And   I have created content

  Scenario: Set up a subscription plan
    Given I have setup a "subscribe" payment plan
    When a user pays using Stripe
    Then they see a confirmation screen of their "subscribe" purchase
    And receive a confirmation email of their "subscribe" purchase

  Scenario: Warn user of unpaid subscription
    Given a user is subscribed
    When a subscription payment error is received from Stripe
    Then the user receives a repayment information email

  Scenario: Revoke access for an unpaid subscription
    Given a user subscription expired 2 month(s) ago
    When the user logs in
    Then they are informed of their expired subscription
    And the user is not able to see my content
