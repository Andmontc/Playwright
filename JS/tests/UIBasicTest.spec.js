const {test, expect} = require('@playwright/test');


test.only('Playwright Browser context initialization', async ({browser}) =>
{
    // Initialization: browser parameters (plugins - cookies)
    const context = await browser.newContext();
    const page =  await context.newPage();
    // locators
    const userName =  page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const errorMsg = page.locator("[style*=block]");
    const cardTitles = page.locator(".card-body a"); // CSS Selector

    await page.goto('/loginpagePractise');
    await userName.type("Andmont");
    await page.locator("#password").type("learning");
    await signIn.click();

    // verify incorrect username/pasword error and get the text
    // use attribute as locator with partial name and assert the name
    console.log(await errorMsg.textContent());
    await expect(errorMsg).toContainText('Incorrect');

    // use of Fill intead of type
    await userName.fill(""); // clear the input
    await userName.fill("rahulshettyacademy");
    await Promise.all(
        [
            page.waitForURL("/angularpractice/shop"),
            signIn.click(),
        ]
    );

    console.log(await cardTitles.allTextContents()); // get all the names in the CSS array

    // using parent and childs selectors
    console.log(await cardTitles.first().textContent()); // using first get the text name of the first element in the css array
    console.log(await cardTitles.nth(1).textContent()); // get the text name of the second element in the array
    console.log(await cardTitles.last().textContent()); // get the last element
    console.log(await page.locator("//a[contains(text(),'iphone X')]").textContent()); // Xpath Selector to do the same as CSS selector
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
