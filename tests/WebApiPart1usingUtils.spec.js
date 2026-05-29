const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../Utils/ApiUtils");

const loginPayload = { userEmail: "alapati.ramya@ymail.com", userPassword: "Ramya!91987" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6a0adf56965c23b43b235b56" }] };

let response;

test.beforeAll(async () => {
    //login API
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

    //order API

});


//test scenario - 
//verify if order is showing up in history page or not?
//precondition - create order - grab order ID - for this we use  API call

test("Rahulshetty Authlogin", async ({ page }) => {

    //by default, playwright donot have ability to insest token in to browser local storage
    // to insert token in to local storage, we have to execute JS
    //playwright can execute any javaScript throught addInitScript method
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("button[routerlink*='myorders']").click();

    //-------------orders page
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //---------------order ID details page
    const orderNumber = await page.locator(".col-text.-main").textContent();
    await page.pause();
    expect(response.orderId.includes(orderNumber)).toBeTruthy();

});