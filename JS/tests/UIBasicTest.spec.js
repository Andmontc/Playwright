const {test, expect} = require('@playwright/test');


test('Playwright Browser context initialization', async ({browser}) =>
{
    // Initialization: browser parameters (plugins - cookies)
    const context = await browser.newContext();
    const page =  await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});

test.only('Playwright page initialization', async ({page}) => {
    // Default Initialization without parameters
    await page.goto("https://google.com/");

    // Assert the title of the page
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

    // Selectors CSS, Xpath
    await page.locator("input[title='Buscar']").type("Testing Automation");
    await page.locator("div[class='FPdoLc lJ9FBc'] input[name='btnK']").press('Enter'); //.press('Key') it's for keyboard keys just write the name of the key as parameter, for mouse click just use .click() function
});
