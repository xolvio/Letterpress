Feature: Setup a one-time charge

  As an author
  I want to configure one-time charge details
  So that I can get paid for my content

  Background: Setup Stripe
    Given I have configured a Stripe account
    And   I have created content

  Scenario: Setup a charge purchase
    Given I have setup a "charge" payment plan
    When a user pays using Stripe
    Then they see a confirmation screen of their "charge" purchase
    And receive a confirmation email of their "charge" purchase
