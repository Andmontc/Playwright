const{loginClientPage} = require('./loginClientPage').default;
const{dashboardPage} = require('./dashboardPage').default;
const{cartPage} = require('./cartPage').default;
const{checkoutPage} = require('./checkoutPage').default;
const{orderHistoryPage} = require('./orderHistoryPage').default;
const{orderSummaryPage} = require('./orderSummaryPage').default

class POManager {

    constructor(page) {
        // Pages
        this.page = page;
        this.loginPage = new loginClientPage(page);
        this.dashPage = new dashboardPage(page);
        this.cartOrderPage = new cartPage(page);
        this.checkPage = new checkoutPage(page);
        this.orderPage = new orderHistoryPage(page);
        this.orderSum = new orderSummaryPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashPage() {
        return this.dashPage;
    }

    getCartOrderPage() {
        return this.cartOrderPage;
    }

    getCheckPage() {
        return this.checkPage;
    }

    getOrderPage() {
        return this.orderPage;
    }

    getOrderSum() {
        return this.orderSum;
    }

}

export default {POManager};
