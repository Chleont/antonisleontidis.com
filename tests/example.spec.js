// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/index.html');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Antonis Leontidis/);
});

test('get contact button', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/index.html');

    // Clicks the contact button.
    await page.getByRole('navigation').getByTestId('Contact').click();

    // Expects page to have a footer element.
    await expect(page.getByTestId('footer')).toBeVisible();
});
