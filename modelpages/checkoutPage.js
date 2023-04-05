class checkoutPage {

    constructor(page) {
        this.page = page;
        this.cardMonth = page.locator("(//select[@class='input ddl'])[1]");
        this.cardDay = page.locator("(//select[@class='input ddl'])[2]");
        this.cvv = page.locator("(//input[@type='text'])[2]");
        this.cardName = page.locator("(//input[@type='text'])[3]");
        this.country = page.locator("//input[@placeholder='Select Country']");
        this.countryOptions = page.locator("//section[@class='ta-results list-group ng-star-inserted']");
        this.submit = page.locator(".btnn.action__submit.ng-star-inserted");
    }

    async fillPayment() {
        await this.cardMonth.selectOption("12");
        await this.cardDay.selectOption("22");
        await this.cvv.fill("123");
        await this.cardName.fill("Andmont");
        await this.country.type("col",{delay:300});
        await this.countryOptions.waitFor();
        const numberOfCountries = await this.countryOptions.locator("button").count();
        for(let j = 0; j < numberOfCountries; j++){
            let country = await this.countryOptions.locator("button").nth(j).textContent();
            if(country.trim() === "Colombia"){
                await this.countryOptions.locator("button").nth(j).click();
                break;
            }
        }
    }

    async checkPaymentEmail() {
        let userEmail = await this.page.locator("label[type='text']").nth(0).textContent();
        return userEmail;
    }

    async clickSubmit() {
        await this.submit.click();
    }
}

export default {checkoutPage};
