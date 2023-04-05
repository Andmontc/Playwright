const base = require('@playwright/test');

exports.customTest = base.test.extend (
    {
        testData: {
            "user" : "anshika@gmail.com",
            "password" : "Iamking@000",
            "productToMatch" : "adidas original"
        }
    }
)
