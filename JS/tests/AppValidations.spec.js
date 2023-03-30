const {test, expect} = require('@playwright/test');


test("popUp frames and hidden elements validations", async({page}) => {

    const hideBox = page.locator("#displayed-text");

    await page.goto('/AutomationPractice');
    await expect(hideBox).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(hideBox).toBeHidden();

    // handle Alerts and Popups
    page.on('dialog', async dialog => {
        let alertMessage = dialog.message();
        await dialog.accept(); // to press the ok button on the alert
        console.log(alertMessage);
        // await dialog.dismiss(); // to press the cancel button on the alert
    }); 
    await page.locator("#confirmbtn").click();

    // handle hoover
    await page.locator("#mousehover").hover();
    await page.locator("a[href='#top']").click();

    // handle Iframes
    const iframePage = page.frameLocator("#courses-iframe");
    await iframePage.locator(".new-navbar-highlighter[href='lifetime-access']").click();
    console.log(await iframePage.locator("div[class='text'] h2 span").textContent());

});