const { test, expect } = require("@playwright/test");

test("Calendar demo", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const inputs = await page.locator(".react-date-picker__inputGroup__input");
    console.log(await inputs.count());

    for (let i = 0; i < await inputs.count(); i++) {
        const val = await inputs.nth(i).inputValue();
        console.log(val);
        await page.pause();
        await expect(val).toEqual(expectedList[i]);
    }
});