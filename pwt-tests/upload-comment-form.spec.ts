import { test, expect } from '@playwright/test';

test('upload comment form', async ({ page }) => {
    async function isCommentFormVisible() {
      return await page.isVisible('.reviews__form');
    }

    const RATING = 'good';
    const LONG_ENOUGH_COMMENT = 'This comment is long enough because it contains 56 chars';

    // Open offer page
    await page.goto('http://localhost:5173');
    await page.waitForSelector('.cities__card');
    await page.locator('.place-card__name').first().click();
    await page.waitForSelector('.offer__inside-list');

    const hasCommentFormBeforeAuth = await isCommentFormVisible();
    expect(hasCommentFormBeforeAuth).toBeFalsy();

    // Auth
    await page.goto('http://localhost:5173/login');
    await page.fill('input[name="email"]', 'someuser@email.com');
    await page.fill('input[name="password"]', 'validpassword123');
    await page.click('button[type="submit"]');

    // Open offer page
    await page.waitForSelector('.cities__card');
    await page.locator('.place-card__name').first().click();
    await page.waitForSelector('.offer__inside-list');

    const hasCommentFormAfterAuth = await isCommentFormVisible();
    expect(hasCommentFormAfterAuth).toBeTruthy();

    const commentForm = page.locator('.reviews__form');
    expect(commentForm).toBeTruthy();

    // Send long enough comment
    await page.fill('[name="review"]', LONG_ENOUGH_COMMENT);
    await page.getByTitle(RATING).click();
    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/comments') && resp.status() === 201
      ),
      page.click('button[type="submit"]'),
    ]);
  });
