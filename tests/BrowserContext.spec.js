const { expect, test } = require("@playwright/test");

test("Browser Contest", async ({ browser }) => {

    const context1 = await browser.newContext();
    const contect2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context1.newPage();

    await page1.goto("https://www.google.com/");
    await page2.goto("https://www.w3schools.com/");

    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(4000);



})