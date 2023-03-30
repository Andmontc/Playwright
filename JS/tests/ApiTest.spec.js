const {test, expect, request} = require('@playwright/test');

const{Apiutils} = require('./Utils/Apiutils').default;
const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
};

const createOrderPayload = {
    orders: [
        {
            country: "Colombia",
            productOrderedId: "6262e990e26b7e1a10e89bfa"
        }
    ]
};

let response;

test.beforeAll( async () => {

    // login Api Token
    const apiContext = await request.newContext();
    const apiutils = new Apiutils(apiContext, loginPayload);
    response = await apiutils.createOrder(createOrderPayload);

});



test ('ClientApp Simple test with Api request and token', async ({page}) => {

    const userEmail = "anshika@gmail.com";

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('/client');

    // find the order in order historypage
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const orderRows = await page.locator("tbody tr");
    for (let i=0; i<await orderRows.count(); i++) {
        const orderHistoryId = await orderRows.nth(i).locator("th").textContent();
        if(response.orderId.includes(orderHistoryId)) {
            await orderRows.nth(i).locator("button").first().click();
            break;
        }
    }

    // assert the order email and country are correct  in details page
    const emailInDetails = await page.locator("div p:nth-child(2)").nth(1).textContent();
    const countryInDetails = await page.locator("div p:nth-child(3)").first().textContent();
    expect (response.orderId.includes(await page.locator("//div[@class='col-text -main']").textContent())).toBeTruthy();
    expect (emailInDetails.includes(userEmail)).toBeTruthy();
    expect (countryInDetails.includes("Colombia")).toBeTruthy();
});
