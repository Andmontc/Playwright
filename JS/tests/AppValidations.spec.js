const {test, expect} = require('@playwright/test');


test("popUp frames and hidden elements validations", async({page}) => {

    const hideBox = page.locator("#displayed-text");

    await page.goto('/AutomationPractice');
    await expect(hideBox).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(hideBox).toBeHidden();
});