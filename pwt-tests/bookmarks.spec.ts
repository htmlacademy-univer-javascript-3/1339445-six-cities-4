import { test, expect } from '@playwright/test';

test('bookmarks', async ({ page }) => {
  async function isFavorite() {
    const bookmarkClassList = await page.locator('.place-card__bookmark-button').first().evaluate((el) => [...el.classList]);
    return bookmarkClassList.includes('place-card__bookmark-button--active');
  };

  async function getFavoritesNumber() {
    return parseInt((await page.locator('.header__favorite-count').textContent()) || '0');
  }

  await page.goto('http://localhost:5173');
  await page.waitForSelector('.cities__card');

  // Cannot add bookmark before auth
  expect(await page.locator('.place-card__bookmark-button').count()).toBe(0);

  // favorites page redirects to login page before auth
  await page.goto('http://localhost:5173/favorites');
  await page.waitForURL('http://localhost:5173/login');

  // Auth
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="email"]', 'someuser@mail.com');
  await page.fill('input[name="password"]', 'validpassword123');
  await Promise.all([
    page.waitForURL('http://localhost:5173'),
    page.click('button[type="submit"]'),
  ]);

  await page.waitForSelector('.cities__card');
  let favoritesNumber = await getFavoritesNumber();
  const isFavoriteBeforeAction = await isFavorite();

  // toggle favorite status
  const [response] = await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes('/favorite') &&
        resp.status() === (isFavoriteBeforeAction ? 200 : 201)
    ),
    page.locator('.place-card__bookmark-button').first().click(),
  ]);

  const isFavoriteAfterAction = await isFavorite();
  expect(isFavoriteAfterAction === !isFavoriteBeforeAction).toBeTruthy();
  if (isFavoriteAfterAction) {
    await page.waitForSelector(`text=${++favoritesNumber}`);
  } else {
    await page.waitForSelector(`text=${--favoritesNumber}`);
  }

  // keep this card favorite
  if (!isFavoriteAfterAction) {
    await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes('/favorite') &&
          resp.status() ===  201
      ),
      page.locator('.place-card__bookmark-button').first().click(),
    ]);
    favoritesNumber++;
  }

  await page.goto('http://localhost:5173/favorites');
  await page.waitForSelector(`.favorites__list`);
  const city = await page.locator('.locations__item-link').first().textContent();

  expect(city).toBe('Paris');
  const newFavoritesNumber = (await page.locator('.locations__item-link').all()).length;
  expect(newFavoritesNumber).toBe(favoritesNumber);
});
