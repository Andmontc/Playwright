const {test, expect} = require('@playwright/test');


test ('Simple testcase on an app', async ({page}) => {
    const productToMatch = "adidas original";
    const email = page.locator("#userEmail");
    const userEmail = "anshika@gmail.com";
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    const products = page.locator(".card-body");
    const cart = page.locator("[routerlink='/dashboard/cart']");
    const countryOptions = page.locator("//section[@class='ta-results list-group ng-star-inserted']");

    await page.goto('/client');
    await email.fill(userEmail);
    await password.fill("Iamking@000");
    await login.click();

    await page.waitForLoadState('networkidle');
    console.log(await page.locator(".card-body b").allTextContents());

    // count the number of elements matching a css selector
    const numberOfProdcts = await products.count();

    // iterate in the elements 
    for (let i = 0; i < numberOfProdcts; i++) {
        let productName = await products.nth(i).locator("b").textContent();
        if(productName === productToMatch) {
            // add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    // assert the product is in the cart page
    await cart.click();
    await page.locator("div li").first().waitFor();
    const productPresent = await page.locator("h3",{hasText:productToMatch}).isVisible();
    expect(productPresent).toBeTruthy();
    await page.locator("li[class='totalRow'] button[type='button']").click();

    // fill payment method page
    await page.locator("(//select[@class='input ddl'])[1]").selectOption("12");
    await page.locator("(//select[@class='input ddl'])[2]").selectOption("22");
    await page.locator("(//input[@type='text'])[2]").fill("123");
    await page.locator("(//input[@type='text'])[3]").fill("Andmont");
    await page.locator("//input[@placeholder='Select Country']").type("col",{delay:100});
    await countryOptions.waitFor();
    const numberOfCountries = await countryOptions.locator("button").count();
    for(let j = 0; j < numberOfCountries; j++){
        let country = await countryOptions.locator("button").nth(j).textContent();
        if(country.trim() === "Colombia"){
            await countryOptions.locator("button").nth(j).click();
            break;
        }
    }
    // assert the email
    await expect(page.locator(".user__name.mt-5 label").nth(0)).toHaveText(userEmail);

    // place order
    await page.locator(".btnn.action__submit.ng-star-inserted").click();
    await expect(page.locator(".hero-primary").nth(0)).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator("tr[class='ng-star-inserted'] label").textContent();
    console.log(orderId);
    
});
