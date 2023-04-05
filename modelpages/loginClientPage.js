class loginClientPage {

    constructor(page) {

        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.login = page.locator("#login");
    }

    async goToLogin() {
        await this.page.goto('/client');
    }

    async validLogin(user, password) {
        await this.email.fill(user);
        await this.password.fill(password);
        await this.login.click();
        await this.page.waitForLoadState('networkidle');
    }
}

export default {loginClientPage};