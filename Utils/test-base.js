const base = require("@playwright/test");

exports.customtest = base.test.extend(
    {
        testDataForOrder:
        {
            userEmail: "alapati.ramya@ymail.com",
            userPassword: "Ramya!91987",
            productName: "ZARA COAT 3"
        }

    }
)