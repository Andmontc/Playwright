const {test, expect} = require('@playwright/test');


test ('Simple testcase on an app', async ({page}) => {
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");

    await page.goto('/client');
    await email.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await login.click();

    await page.waitForLoadState('networkidle');
    console.log(await page.locator(".card-body b").allTextContents());

});