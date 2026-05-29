const { test, expect, request } = require('@playwright/test');
const { promises } = require('node:dns');

test("Browser Context Playwright Test", async ({ browser }) => {
    //in the above browser is fixture. In PW fixtures work as global variables. we have to wrap them in curly braces
    //playwright code
    //as JS is aysnchronus (means code never executed in order)
    //for that we have to put await in front of every step so that execution waits untill it completes the current step
    //to do so we have to add async keyword before function. 
    //await and aynce is a combination duo. if we don't put async await ininside function won't work

    //if function don't have any name it is called ananymous function. so instead of writing function we cne use fat pipe =>
    // so that js will consider as ananymous function
    const context = await browser.newContext();
    const page = await context.newPage();
    //it blockd all CSS from loading
    //page.route("**/*.css", route => route.abort());
    //below code blocks all jpg images
    //page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    const username = page.locator("input[id='username']");
    const password = page.locator("input[type='password']");
    const signIn = page.locator("input[type='submit']");
    const cardTitles = page.locator(".card-body a");

    //page.on - on method is a listener. It will invoke when an event occurs
    //what event occurs we have to write in 1st argument, when 1st event occurs on method will activaate
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status())),
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");


    await username.fill("rahulshettyacademy");

    await password.fill("Learning@830$3mK2");
    await signIn.click();

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});



// below test is alternative to above test, PW provides another fixture called page
//const context = await browser.newContext(); in this piece of code there is nothing in context
//so for empty contect scenario, we can write code like

test("Page  Playwright Test", async ({ page }) => {

    await page.goto("https://google.com/");

    const pageTitle = await page.title();
    console.log(pageTitle);
    //assertion in PW
    await expect(page).toHaveTitle(pageTitle);

});

test("UI Controls", async ({ page }) => {

    const username = page.locator("input[id='username']");
    const password = page.locator("input[type='password']");
    const signIn = page.locator("input[type='submit']");
    const blinkText = page.locator("a[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyademy");
    await password.fill("Learning@830$3mK2");

    //radio button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //validation to check whtehr radio buttion is selected or not
    console.log(await page.locator(".radiotextsty").last().isChecked()); // it returns boolean value. if checked true or false
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    //Static dropdown 
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Student");
    //it pauses at the above step
    //await page.pause();

    //checkbox
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    //to uncheck , instead of clicking again , PW has uncheck method
    await page.locator("#terms").uncheck();
    //PW don't have assetion to verify uncheck instead do below
    //expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //alternative to above method
    await expect(page.locator("#terms")).not.toBeChecked();

    //to verify the link is blinking or not
    await expect(blinkText).toHaveAttribute("class", "blinkingText");

});

test("Child window handling", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator("input[id='username']");
    const blinkText = page.locator("a[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), //listen for any new page pending, rejected , fulfilled
            blinkText.click(),

        ]
    );
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);

    await username.fill(domain);
    await page.pause();
    console.log(await username.inputValue());


});

