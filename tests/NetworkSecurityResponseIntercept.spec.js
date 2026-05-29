//fake Response Body

const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../Utils/ApiUtils");

const loginPayload = { userEmail: "alapati.ramya@ymail.com", userPassword: "Ramya!91987" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };
//above line is JavaScript standats object instead of JSON. we have to conver to JSON in line 46
let response;

test.beforeAll(async () => {
    //login API
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

    //order API

});
// ----------Object of test ----------------
//when user goes to Orders from main menu, testing for no oreders scenario 
//instead of deleting all existing orders, tweaking the API call to acheive no order page


test("Rahulshetty Authlogin", async ({ page }) => {

    //by default, playwright donot have ability to insest token in to browser local storage
    // to insert token in to local storage, we have to execute JS
    //playwright can execute any javaScript throught addInitScript method
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    // page.route take 2 arguments. 1st argument original one
    //2nd argumnet how we want to route / tweak
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            // here we are intercepting the response
            //when intercepting response, API will give back the response and that response we
            //will send it to browser , using that response browser will render the data on front end
            //intetcepting response -> API response - > {Playwright will Fake Response} -> 
            //Browser -> render data on front end

            //below step - page.request means converting page to API and then fetch response from route.reuest
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            //fullfill send response to browser, while sending response to browser, we have to fake it
            route.fulfill(
                {
                    response,
                    body
                    //here we are sensing same response but overriding the body (fake body)
                }
            )

        }
    );



    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
});