class DashboardPage {

    constructor(page) {

        this.page = page
        this.products = page.locator(".card-body"); // produc divs
        this.productsText = page.locator(".card-body b"); //product titles
        this.cart = page.locator("button[routerlink*='cart']"); //cart button on menu
        this.odrersButton = page.locator("button[routerlink*='myorders']");//Orders button on menu
    }

    async searchProductAddCart(productName) {

        await this.productsText.first().waitFor();
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        console.log("counct is : " + count);
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("button").nth(1).click();
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cart.click();
    }
    async naviagteToOrdersPage() {
        await this.odrersButton.click();
    }
}

module.exports = { DashboardPage };