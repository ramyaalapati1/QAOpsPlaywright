class LoginPage {
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.signInButton = page.locator("#login");
    }
    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/")
    }
    async validLogin(userEmail, userPassword) {
        await this.userEmail.fill(userEmail);
        await this.userPassword.fill(userPassword);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}
module.exports = { LoginPage };