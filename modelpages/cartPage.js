class cartPage {

    constructor(page) {
        this.page = page;
        this.checkOrderBtn = page.locator("li[class='totalRow'] button[type='button']");
      
    }

    async checkProductInCart(productToMatch){
        await this.page.locator("div li").first().waitFor();
        const productPresent = await this.page.locator("h3",{hasText:productToMatch}).isVisible();
        return productPresent;
    }

    async clickOrderBtn(){
        await this.checkOrderBtn.click();
    }
    
}

export default {cartPage};
