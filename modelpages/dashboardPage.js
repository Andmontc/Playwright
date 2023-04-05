class dashboardPage {

    constructor(page) {

        this.page = page;
        this.products = page.locator(".card-body");
        this.cardTitles = page.locator(".card-body b");
        this.cart = page.locator("[routerlink='/dashboard/cart']");

        }

    async getProductTitles() {
        return await this.cardTitles.allTextContents();
    }

    async addProduct(product) {
        // count the number of elements matching a css selector
        const numberOfProdcts = await this.products.count();

        // iterate in the elements 
        for (let i = 0; i < numberOfProdcts; i++) {
            let productName = await this.products.nth(i).locator("b").textContent();
            if(productName === product) {
                // add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }
}

export default {dashboardPage};