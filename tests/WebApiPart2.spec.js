const { test, expect } = require("@playwright/test");

let WebContext;
const email = "alapati.ramya@ymail.com";

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const password = "Ramya!91987";
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const login = page.locator("#login");

    await page.goto("https://rahulshettyacademy.com/client/");
    await userEmail.fill(email);
    await userPassword.fill(password);
    await login.click();
    await page.waitForLoadState("networkidle");
    //storageState method, will capture all the date, like storage, coockies, toknes etc
    //and we will store it in json file call storage.json file
    await context.storageState({ path: 'state.json' });
    //now open new browser context by giving the info from State.json file
    //mean we are injecting existing storage data
    WebContext = await browser.newContext({ storageState: 'state.json' });

})

test("Rahulshetty Authlogin", async () => {

    const page = await WebContext.newPage();

    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body"); // produc divs
    const productTitles = page.locator(".card-body b"); //product titles
    const cart = page.locator("button[routerlink*='cart']"); //cart button
    const orders = page.locator("button[routerlink*='myorders']"); //Orders button main menu



    //---------------dash board page
    await productTitles.first().waitFor();
    const titles = await productTitles.allTextContents();
    console.log(titles);
    const count = await products.count();
    console.log("counct is : " + count);
    for (let i = 0; i < count; i++) {
        //below of logic is finding 1st div, form  there finding child element. in this case "b". means "b" is in scope of products.nth(i)
        //const title = await products.nth(i).locator("b").textContent();
        //console.log(title);
        if (await products.nth(i).locator("b").textContent() === productName) {
            //if (title.trim().toLowerCase() === productName.toLowerCase()) {
            await products.nth(i).locator("button").nth(1).click();
            //alternative to above text, find element by text
            //await products.nth(i).locator("text= Add To Cart").click(); // text = visible text content

            break;
        }
    }
    await cart.click();
    //-------------checkout page
    //after clicking Cart it takes couple of seconds to load. so below step waits untill list of cart items load
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    await expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    //-----------payment page
    //enter data into country.pressSequentially is to eneter one by one char
    await page.locator("input[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    //dropdown options container
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const options = await dropdown.locator("button").count();
    for (let i = 0; i < options; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //assertion to check greyedout email
    await expect(page.locator("div.user__name [type='text']").first()).toHaveText(email);
    //Place Order Button
    await page.locator(".action__submit").click();

    //------------confirmation page
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //click on ORDERS button from main menu
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
    await page.pause();
    //---------------order ID details page
    const orderNumber = await page.locator(".col-text.-main").textContent();
    expect(orderId.includes(orderNumber)).toBeTruthy();

});

test("Product Titles only", async () => {

    const page = await WebContext.newPage();

    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body"); // produc divs
    const productTitles = page.locator(".card-body b"); //product titles
    const cart = page.locator("button[routerlink*='cart']"); //cart button
    const orders = page.locator("button[routerlink*='myorders']"); //Orders button main menu
    //---------------dash board page
    await productTitles.first().waitFor();
    const titles = await productTitles.allTextContents();
    console.log(titles);
});