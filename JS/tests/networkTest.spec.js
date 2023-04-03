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

    // Intercepting network response to bypass a request
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca',
    async route => {
        const routeResponse = await page.request.fetch(route.request());
        let body = fakePayload;
        route.fulfill({
            routeResponse, 
            body,
        });
    });
    // find the order in order historypage
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca');
    const blankOrders = await page.locator(".mt-4").textContent();
    console.log(blankOrders);

});
