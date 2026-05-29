const { test, expect } = require("@playwright/test");

test("Pop-Up and Hidden elements", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");

    //browser go back and go forward actions
    await page.goBack();
    await page.goForward();
    await page.goBack();

    // validate visible / not visible actions
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //handling alert / java pop-ups

    await page.on("dialog", dialog => dialog.accept());
    await page.locator("#show-textbox").click();
    await page.locator("#mousehover").hover();
    await page.locator(".mouse-hover-content a").last().click();

});
test("Screenshot Testing", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    //element Screenshot
    await page.locator("#displayed-text").screenshot({ path: "elementSS.png" });
    await page.locator("#hide-textbox").click();
    //page Screenshot
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();
    //Visual Testing
});

test("Visula Testing", async ({ page }) => {

    await page.goto("https://www.google.com/");
    //expect(await page.screenshot()).toMatchSnapshot('landing.png');
    //alternative method
    await expect(page).toHaveScreenshot();
});
