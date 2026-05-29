const { test, expect } = require("@playwright/test");
const { link } = require("fs");
const { text } = require("stream/consumers");

test("Playwright Special Locatore", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //get by labels
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    //get by placeHolders 😊😊
    await page.getByPlaceholder("Password").fill("Ramya");

    //get by role 😍😍
    await page.getByRole("button", { name: "Submit" }).click();

    //get by text
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //get by role 😍😍
    await page.getByRole("link", { name: "Shop" }).click();

    //chaining conditions
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

});