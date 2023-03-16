const {test, expect} = require('@playwright/test');


test.only('Playwright Browser context initialization', async ({browser}) =>
{
    // Initialization: browser parameters (plugins - cookies)
    const context = await browser.newContext();
    const page =  await context.newPage();

    await page.goto('/loginpagePractise');
    await page.locator("#username").type("Andmont");
    await page.locator("#password").type("learning");
    await page.locator("#signInBtn").click();
    // verify incorrect username/pasword error and get the text
    // use attribute as locator with partial name and assert the name
    console.log(await page.locator("[style*=block]").textContent());
    await expect(page.locator("[style*=block]")).toContainText('Incorrect');
});

test('Playwright page initialization', async ({page}) => {
    // Default Initialization without parameters
    await page.goto("https://google.com/");

    // Assert the title of the page
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

    // Selectors CSS, Xpath
    await page.locator("input[title='Buscar']").type("Testing Automation");
    await page.locator("div[class='FPdoLc lJ9FBc'] input[name='btnK']").press('Enter'); //.press('Key') it's for keyboard keys just write the name of the key as parameter, for mouse click just use .click() function
});
