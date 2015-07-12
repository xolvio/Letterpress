Feature: Audit 
  
  As an administrator
  I want to audit charges and payments
  So that I can resolve any discrepencies
  
  Scenario: View past transactions
    Given a customer has made a purchase
    When I query the audit collection
    Then I'm able to find their transaction details