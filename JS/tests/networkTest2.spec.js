const {test, expect, request} = require('@playwright/test');

const{Apiutils} = require('../../Utils/Apiutils').default;

const loginPayload = {
    userEmail: "rahulshetty@gmail.com",
    userPassword: "Iamking@00"
};

const createOrderPayload = {
    orders: [
        {
            country: "Cuba",
            productOrderedId: "6262e990e26b7e1a10e89bfa"
        }
    ]
};

let response;

const fakePayload = {
    data:[], 
    message:"No Orders"
};

test.beforeAll( async () => {

    // login Api Token
    const apiContext = await request.newContext();
    const apiutils = new Apiutils(apiContext, loginPayload);
    response = await apiutils.createOrder(createOrderPayload);

});


test ('Network Test', async ({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('/client');
    
    // find the order in order history page
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=642b390a568c3e9fb146d6d3", 
    async route => {
        await route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=642b00cc568c3e9fb146a7c7"});
    })
    await page.locator("//tbody/tr[1]/td[5]/button[1]").click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

});
