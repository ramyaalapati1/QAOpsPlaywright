const { test, expect } = require("@playwright/test");

test("@Web Rahulshetty Authlogin", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client/");
    const userEmail = page.getByPlaceholder("email@example.com");
    const userPassword = page.getByPlaceholder("enter your passsword");
    const login = page.getByRole("button", { name: "Login" });
    const products = page.locator(".card-body"); // produc divs
    const productTitles = page.locator(".card-body b"); //product titles
    const cart = page.getByRole("listitem").getByRole("button", { name: "Cart" }); //cart button
    const orders = page.locator("button[routerlink*='myorders']"); //Orders button main menu

    const email = "alapati.ramya@ymail.com";

    //landing page
    await userEmail.fill(email);
    await userPassword.fill("Ramya!91987");
    await login.click();
    //to wait until all content loads (means all network calls finished and and till networkidle state )
    await page.waitForLoadState("networkidle");
    //above step is sometimes flaky so alternative solution is
    //---------------dash board page
    await productTitles.first().waitFor();
    const titles = await productTitles.allTextContents();
    console.log(titles);
    const count = await products.count();
    console.log("counct is : " + count);
    await products.filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: " Add To Cart" }).click();

    await cart.click();
    //-------------checkout page
    //after clicking Cart it takes couple of seconds to load. so below step waits untill list of cart items load
    await page.locator("div li").first().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();
    //-----------payment page
    //enter data into country.pressSequentially is to eneter one by one char
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    await page.getByRole("button", { name: "India" }).nth(1).click();

    //Place Order Button
    await page.getByText("PLACE ORDER").click();

    //------------confirmation page
    await expect(page.getByText(" Thankyou for the order.")).toBeVisible();

});