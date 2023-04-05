class orderHistoryPage {

    constructor(page) {
        this.page = page;
        this.orderLink = page.locator("label[routerlink='/dashboard/myorders']");

    }

    async getOrderTitles() {
        let orderTitle = this.page.locator(".hero-primary").nth(0).textContent();
        return orderTitle;
    }

    async getOrderId() {
        const orderId = await this.page.locator("tr[class='ng-star-inserted'] label").textContent();
        return orderId;
    }

    async goToOrderHistory() {
        await this.orderLink.click();
    }

    async getOrderHistory(orderId) {
        await this.page.locator("//table[@class='table table-bordered table-hover ng-star-inserted']").waitFor();
        const orderRows = await this.page.locator("tbody tr");
        for (let i=0; i<await orderRows.count(); i++) {
            const orderHistoryId = await orderRows.nth(i).locator("th").textContent();
            if(orderId.includes(orderHistoryId)) {
                await orderRows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}

export default {orderHistoryPage};
