const { test, expect } = require("@playwright/test");

test("Request Intercept - security tets", async ({ page }) => {

    const productName = "ZARA COAT 3";
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const login = page.locator("#login");
    const email = "alapati.ramya@ymail.com";

    await page.goto("https://rahulshettyacademy.com/client/");
    await userEmail.fill(email);
    await userPassword.fill("Ramya!91987");
    await login.click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }));
    //continue method is used to intercept network requests calls
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('p').last()).toHaveText("You are not authorize to view this order");


})