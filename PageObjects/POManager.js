const { LoginPage } = require("../PageObjects/LoginPage");
const { DashboardPage } = require("../PageObjects/DashboardPage");
const { CartPage } = require("../PageObjects/CartPage");
const { OrdersReviewPage } = require("../PageObjects/OrdersReviewPage");
const { OrdersHistoryPage } = require("../PageObjects/OrdersHistoryPage");


class POManager {


    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;

    }
}

module.exports = { POManager };

