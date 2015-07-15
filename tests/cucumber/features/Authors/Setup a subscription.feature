Feature: Setup a subscription

  As an author
  I want to configure subscription details
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

#  @ignore
#  Scenario: Give user a graceful period to to fix payments
#    Given a user subscription has expired
#    When the user logs 7 days past their due date
#    Then the user is able to see my content
#
#  @ignore
#  Scenario: Revoke access for an unpaid subscription after graceful period
#    Given a user subscription has expired
#    When the user logs 8 days past their due date
#    Then the user is not able to see my content