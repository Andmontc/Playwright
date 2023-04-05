class orderSummaryPage {

    constructor(page) {
        this.page = page;
        this.orderNumber = page.locator("//div[@class='col-text -main']");
    }

    async orderSummaryDetails() {
        let details = [];
        const emailInDetails = await this.page.locator("div p:nth-child(2)").nth(1).textContent();
        const countryInDetails = await this.page.locator("div p:nth-child(3)").first().textContent();
        let orderNum = await this.orderNumber.textContent();
        details.push(emailInDetails, countryInDetails, orderNum);
        return details;
    }
}

export default {orderSummaryPage};