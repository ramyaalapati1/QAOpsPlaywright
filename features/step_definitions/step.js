const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require("../../PageObjects/POManager");
const { test, expect } = require("@playwright/test");
const { chromium } = require('playwright');
const { TIMEOUT } = require('node:dns');

Given('Login to ecommerce apllication with {string} and {string}', { timeout: 100 * 1000 }, async function (userEmail, userPassword) {

    const products = await this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(userEmail, userPassword);
});

When('Add {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();

});


Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName)
    await cartPage.Checkout();
});

When('Enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});


Then('Verify order is present in order history', async function () {
    await this.dashboardPage.naviagteToOrdersPage();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


Given('Login to Ecommerce2 apllication with {string} and {string}', async function (username, password) {

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await this.page.locator("input[id='username']").fill(username);
    await this.page.locator("input[type='password']").fill(password);
    await this.page.locator("input[type='submit']").click();
});



Then('Verify error message is displayed', async function () {

    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});





