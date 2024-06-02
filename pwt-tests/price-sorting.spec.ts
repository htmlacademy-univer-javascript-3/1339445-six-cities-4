import { test, expect } from '@playwright/test';

test('price sorting', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('.cities__card');

  // Price: low to high
  await page.click('.places__sorting-type');
  await page.click('text="Price: low to high"');
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const pricesAscending = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  for (let i = 1; i < pricesAscending.length; i++) {
    expect(pricesAscending[i]).toBeGreaterThanOrEqual(pricesAscending[i - 1]);
  }
  // ---

  // Price: high to low
  await page.click('.places__sorting-type');
  await page.click('text="Price: high to low"');
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const pricesDescenging = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  for (let i = 0; i < pricesDescenging.length - 1; i++) {
    expect(pricesDescenging[i + 1]).toBeLessThanOrEqual(pricesDescenging[i]);
  }
  // ---
});
