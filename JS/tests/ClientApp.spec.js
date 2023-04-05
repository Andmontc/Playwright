const {test, expect} = require('@playwright/test');
const {customTest} = require('../../Utils/test-base');
const {POManager} = require('../../modelpages/POManager').default;
const dataset = JSON.parse(JSON.stringify(require('../../Utils/ClientAppJson.json')));

for(let data of dataset){
    test (`Simple testcase on an app ${data.productToMatch}`, async ({page}) => {

        //POManager
        const pageManager = new POManager(page);
        // Pages
        const loginPage = pageManager.getLoginPage();
        const dashPage = pageManager.getDashPage();
        const cartOrderPage = pageManager.getCartOrderPage();
        const checkPage = pageManager.getCheckPage();
        const orderPage = pageManager.getOrderPage();
        const orderSum = pageManager.getOrderSum();
        
        // go to login page
        await loginPage.goToLogin();
        await loginPage.validLogin(data.user, data.password);
        
        // get the titles of the products
        let titles = await dashPage.getProductTitles();
        console.log(titles);
        
        // add the product to the cart
        await dashPage.addProduct(data.productToMatch);

        // go to cart page
        await dashPage.navigateToCart();

        // assert the product is in the cart page
        let productPresent = await cartOrderPage.checkProductInCart(data.productToMatch);
        expect(productPresent).toBeTruthy();
        await cartOrderPage.clickOrderBtn();

        // fill payment method page
        await checkPage.fillPayment();

        // assert the email
        let userEmail = await checkPage.checkPaymentEmail();
        expect(userEmail).toContain(data.user);
        await checkPage.clickSubmit();

        // place order
        let orderTitle = await orderPage.getOrderTitles();
        expect(orderTitle).toContain(" Thankyou for the order. ");
        let orderId = await orderPage.getOrderId();

        // find the order in order historypage
        await orderPage.goToOrderHistory();
        await orderPage.getOrderHistory(orderId);

        // assert the order email and country are correct  in details page
        let details = await orderSum.orderSummaryDetails();
        expect (details[0].includes(data.user)).toBeTruthy();
        expect (details[1].includes("Colombia")).toBeTruthy();
        expect (orderId.includes(details[2])).toBeTruthy();

    });
}

customTest.only(`Simple testcase on an app with fixer`, async ({page, testData}) => {

    //POManager
    const pageManager = new POManager(page);
    // Pages
    const loginPage = pageManager.getLoginPage();
    const dashPage = pageManager.getDashPage();
    const cartOrderPage = pageManager.getCartOrderPage();
    
    // go to login page
    await loginPage.goToLogin();
    await loginPage.validLogin(testData.user, testData.password);
    
    // get the titles of the products
    let titles = await dashPage.getProductTitles();
    console.log(titles);
    
    // add the product to the cart
    await dashPage.addProduct(testData.productToMatch);

    // go to cart page
    await dashPage.navigateToCart();

    // assert the product is in the cart page
    let productPresent = await cartOrderPage.checkProductInCart(testData.productToMatch);
    expect(productPresent).toBeTruthy();
});
