Feature: Audit

  As an administrator
  I want to audit charges and payments
  So that I can resolve any discrepancies

  Scenario: View past transactions
    Given a customer made a purchase
    When I search for the transaction by their email
    Then I'm able to see their transaction details
