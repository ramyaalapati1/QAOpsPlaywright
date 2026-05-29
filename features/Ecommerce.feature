Feature:Ecommerce Validation
    @Regression
    Scenario:Placing the order
        Given Login to ecommerce apllication with "alapati.ramya@ymail.com" and "Ramya!91987"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and place the order
        Then Verify order is present in order history

    @ErrorValidation
    Scenario Outline: Placing the order

        Given Login to Ecommerce2 apllication with "<username>" and "<password>"
        Then Verify error message is displayed
        Examples:
            | username          | password          |
            | rahulshettydemy   | Learning@830$3mK2 |
            | rahulshttyacademy | Learning@830$3mK2 |
