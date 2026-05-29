const { test, expect } = require("@playwright/test");
const { POManager } = require("../PageObjects/POManager");
const { customtest } = require("../Utils/test-base");
const { randomInt } = require("node:crypto");
//basically require("../Utils/PlaceOrderTestData.json"); this line returns
//objetc of that whole file which holds json
//so covert thsi json to Java Script Object by JSON Parse
//lets save in const dataSet. this data set have the knowledge of all ths data in json
//to avoid encoding problems conver like below
//Json -> sring -> js Object
const dataset = JSON.parse(JSON.stringify(require("../Utils/PlaceOrderTestData.json")));

for (const data of dataset) {
    test(`Ordering Prodcut USing POM -  ${data.productName}`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const poManager = new POManager(page);
        //below can coment as now data is coming from PlaceOrderTestData.json
        //so use dataset.usrEmail
        // const userEmail = "alapati.ramya@ymail.com";
        // const userPassword = "Ramya!91987";
        // const productName = "ZARA COAT 3";
        const countryCode = "ind";
        const countryName = "India";

        const loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.validLogin(data.userEmail, data.userPassword);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName)
        await cartPage.Checkout();


        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect(countryCode, countryName);

        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.naviagteToOrdersPage();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


    });
}

customtest(`custom Test using fixture testDataForOrder`, async ({ browser, testDataForOrder }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    //below can coment as now data is coming from PlaceOrderTestData.json
    //so use dataset.usrEmail
    // const userEmail = "alapati.ramya@ymail.com";
    // const userPassword = "Ramya!91987";
    // const productName = "ZARA COAT 3";
    const countryCode = "ind";
    const countryName = "India";

    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(testDataForOrder.userEmail, testDataForOrder.userPassword);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName)
    await cartPage.Checkout();
});
