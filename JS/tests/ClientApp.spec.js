const {test, expect} = require('@playwright/test');
const{loginClientPage} = require('../../modelpages/loginClientPage').default;
const{dashboardPage} = require('../../modelpages/dashboardPage').default;
const{cartPage} = require('../../modelpages/cartPage').default;
const{checkoutPage} = require('../../modelpages/checkoutPage').default;
const{orderHistoryPage} = require('../../modelpages/orderHistoryPage').default;
const{orderSummaryPage} = require('../../modelpages/orderSummaryPage').default

test.only ('Simple testcase on an app', async ({page}) => {
    const user = "anshika@gmail.com";
    const password = "Iamking@000";
    const productToMatch = "adidas original";

    // Pages
    const loginPage = new loginClientPage(page);
    const dashPage = new dashboardPage(page);
    const cartOrderPage = new cartPage(page);
    const checkPage = new checkoutPage(page);
    const orderPage = new orderHistoryPage(page);
    const orderSum = new orderSummaryPage(page);
    
    // go to login page
    await loginPage.goToLogin();
    await loginPage.validLogin(user, password);

    // get the titles of the products

    let titles = await dashPage.getProductTitles();
    console.log(titles);

    // add the product to the cart
    await dashPage.addProduct(productToMatch);

    // go to cart page
    await dashPage.navigateToCart();

    // assert the product is in the cart page
    let productPresent = await cartOrderPage.checkProductInCart(productToMatch);
    expect(productPresent).toBeTruthy();
    await cartOrderPage.clickOrderBtn();

    // fill payment method page
    await checkPage.fillPayment();

    // assert the email
    let userEmail = await checkPage.checkPaymentEmail();
    expect(userEmail).toContain(user);
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
    expect (details[0].includes(user)).toBeTruthy();
    expect (details[1].includes("Colombia")).toBeTruthy();
    expect (orderId.includes(details[2])).toBeTruthy();

});
