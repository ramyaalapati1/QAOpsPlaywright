const { test, expect, request } = require("@playwright/test");

const loginPayload = { userEmail: "alapati.ramya@ymail.com", userPassword: "Ramya!91987" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6a0adf56965c23b43b235b56" }] };

//declare token globally so that we can use throught the test
let token;
let orderId;

test.beforeAll(async () => {
    //login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    );
    //asserting status. 200 series all okay means truth
    expect(loginResponse.ok()).toBeTruthy();
    //extracting json response
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    //order API
    const responseOrder = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'authorization': token,
                'content-type': 'application/json'
            },
        }
    )
    const orderResponseJson = await responseOrder.json();
    console.log("Order response is:", JSON.stringify(orderResponseJson, null, 2));
    orderId = orderResponseJson.orders[0];
    console.log(`Order ID is : ${orderId}`)
});

//test scenario - 
//verify if order is showing up in history page or not?
//precondition - create order - grab order ID - for this we use  API call

test("Rahulshetty Authlogin", async ({ page }) => {

    const orderId = createOrder();
    //by default, playwright donot have ability to insest token in to browser local storage
    // to insert token in to local storage, we have to execute JS
    //playwright can execute any javaScript throught addInitScript method
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("button[routerlink*='myorders']").click();

    //-------------orders page
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //---------------order ID details page
    const orderNumber = await page.locator(".col-text.-main").textContent();
    await page.pause();
    expect(orderId.includes(orderNumber)).toBeTruthy();

});