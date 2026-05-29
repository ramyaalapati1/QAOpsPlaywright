const { test, expect } = require("@playwright/test");

test("Frames", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Fefining Frames from page object
    const framesPage = page.frameLocator("#courses-iframe");
    //out of two element if one of the element is invisible and one is visible, to find visible element
    //put :visible to fine visible element
    await framesPage.frameLocator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});