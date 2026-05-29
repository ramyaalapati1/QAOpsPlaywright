const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require("../../PageObjects/POManager");
const { test, expect } = require("@playwright/test");
const { chromium } = require('playwright');
const { TIMEOUT } = require('node:dns');

Before(async function () {
    //logic to launch browser and creationg page object
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    //this is world constructor
    this.poManager = new POManager(this.page);

})

After(function () {
    console.log("I am last to execute");
})

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
})