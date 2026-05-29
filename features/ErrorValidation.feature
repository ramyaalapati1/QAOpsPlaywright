Feature:Ecommerce Validation
    @ErrorValidation
    Scenario Outline: Placing the order

        Given Login to Ecommerce2 apllication with "<username>" and "<password>"
        Then Verify error message is displayed
        Examples:
            | username          | password          |
            | rahulshettydemy   | Learning@830$3mK2 |
            | rahulshttyacademy | Learning@830$3mK2 |