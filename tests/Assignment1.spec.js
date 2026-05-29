const { test, expect, page } = require("@playwright/test");

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'

/**
 * @param {import('@playwright/test').Page} page
 */
async function login(page) {
    await page.goto(BASE_URL);
    await page.getByPlaceholder("you@email.com").fill("alapati.ramya@ymail.com");
    await page.getByLabel("Password").fill("Vaishnavi20!!");
    await page.locator("#login-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible();
}


test("Assignment1", async ({ page }) => {
    await login(page);

    await page.getByRole("button", { name: "Admin" }).click();
    await page.getByText("Manage Events").first().click();
    const eventTitle = `Test Event by ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("Playwright test event");
    await page.getByLabel("City").fill("Singapore");
    await page.getByLabel("Venue").fill("Khathib & Sinagpore");
    await page.getByLabel("Event Date & Time").fill('2027-12-31T10:00');
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.getByRole("button", { name: "+ Add Event" }).click();

    await expect(page.getByText("Event created!")).toBeVisible();


    await page.locator("#nav-events").click();

    const eventCards = page.locator("#event-card");
    await expect(page.locator("#event-card").first()).toBeVisible();




    const expectedEventCard = await eventCards.filter({ hasText: eventTitle }).first();

    await expect(expectedEventCard).toBeVisible({ timeout: 5000 });

    const seatsBeforBooking = parseInt(await expectedEventCard.getByText("seat").innerText());
    console.log(await expectedEventCard.getByText("seat").first().innerText());
    console.log(seatsBeforBooking);

    await expectedEventCard.locator("#book-now-btn").click();

    //step5
    await page.getByText(eventTitle).waitFor();
    const tickectCount = page.locator("#ticket-count");
    await expect(tickectCount).toHaveText("1");
    await page.getByLabel("Full Name").fill("Ramya");
    await page.locator("#customer-email").fill("alapati.ramya@ymail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
    await page.locator("#confirm-booking").click();

    //step6
    await page.getByText("Booking Confirmed! 🎉").waitFor();
    const bookingRefID = await page.locator(".booking-ref").first();
    await expect(bookingRefID).toBeVisible();
    const bookingRef = (await bookingRefID.innerText()).trim();
    console.log("Booking is confirmed :" + bookingRef);

    //step7
    await page.getByRole("button", { name: "View My Bookings" }).click();

    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    const bookingCards = page.locator("#booking-card");
    await expect(await bookingCards.first()).toBeVisible();
    const matchingCard = bookingCards.filter({ has: page.locator(".booking-ref", { hasText: bookingRef }) });
    await expect(matchingCard).toBeVisible();

    await expect(matchingCard).toContainText(eventTitle);
    console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);
    await page.pause();
    //step8
    await page.locator("#nav-events").click();
    const eventCard = page.locator("#event-card");
    await expect(eventCard.first()).toBeVisible();
    const filetredCard = eventCard.filter({ hasText: eventTitle }).first();
    await expect(filetredCard).toBeVisible();
    const seatsAfterBooking = parseInt(await filetredCard.getByText("seats").first().innerText());
    console.log(`Seats after booking: ${seatsAfterBooking}`);
    expect(seatsAfterBooking).toBe(seatsBeforBooking - 1);



















    await page.pause();
















});

test("test", () => {
    // console.log(parseInt("43Ramya"));
    // const uniqueTitle = "Event Title " + Date.now()
    // console.log(uniqueTitle);
    console.log(parseInt("49/50"));
});