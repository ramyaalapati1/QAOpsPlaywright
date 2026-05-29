const { test, expect, page } = require("@playwright/test");

test('sample test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadButton = await page.locator("#downloadButton");
    console.log(await downloadButton.innerHTML());
    console.log(await downloadButton.allTextContents());
    console.log(await downloadButton.textContent());
    const header = await page.locator("div[role='rowgroup']");
    console.log(header);
    console.log(await header.getByText('Fruit Name').textContent());
    console.log(downloadButton);

})