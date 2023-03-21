const {test, expect} = require('@playwright/test');


test('Playwright Browser context initialization', async ({page}) =>
{
    // Initialization: browser parameters (plugins - cookies)
    // const context = await browser.newContext();
    // const page =  await context.newPage();


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

test('Playwright controls', async ({page}) => {
    // Radio buttons and Dropdowns
    const dropDown = page.locator("select.form-control");
    const termsCheck = page.locator("#terms");
    const blinkText = page.locator("//a[contains(text(),'Free Access to InterviewQues/ResumeAssistance/Mate')]"); 

    await page.goto('/loginpagePractise');
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await termsCheck.click();
    await dropDown.selectOption("consult");


    // assertion
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked()); // this is not an assertion but a way to confirm if the element is check (true) or no (false)
    await expect(termsCheck).toBeChecked();
    await termsCheck.uncheck();
    expect(await termsCheck.isChecked()).toBeFalsy();

    // assert blinking link/text
    await expect(blinkText).toHaveAttribute("class", "blinkingText");
    
    //await page.pause(); pause the execution for debug

})

test.only('Playwright chil and tab windows', async ({browser}) => {

    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName =  page.locator("#username");

    const blinkText = page.locator("//a[contains(text(),'Free Access to InterviewQues/ResumeAssistance/Mate')]");

    await page.goto('/loginpagePractise');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkText.click(),
    ])
    
    // print the text of another window after click in the link
    const text = await newPage.locator(".im-para.red").textContent();
    console.log(text);

    // split the text and capture username
    const arrayText = text.split("@");
    const domain = arrayText[1].split(".")[0];
    console.log(domain);

    // return to previous page and type the username using page not newPage
    await userName.type(domain);

})

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
