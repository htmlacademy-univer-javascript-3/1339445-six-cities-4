import { test, expect, Locator } from '@playwright/test';

test('city filter', async ({ page }) => {
  const hasActiveCity = async (locator: Locator) => {
    const classList = await locator.evaluate((el) => [...el.classList]);
    return classList.includes('tabs__item--active');
  };

  await page.goto('http://localhost:5173');
  await page.waitForSelector('.locations__item-link');

  for (const li of await page.locator('.locations__item-link').all()) {
    await li.click();
    const currentCity = await li.textContent();

    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    expect(await hasActiveCity(li)).toBeTruthy();

    const activeCity = (await page.locator('.places__found').textContent())?.split(' ').pop();
    expect(currentCity).toBe(activeCity);
  }
});
