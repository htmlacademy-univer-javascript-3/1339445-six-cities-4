import { test, expect } from '@playwright/test';

test('login form', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  // invalid email
  await page.fill('input[name="email"]', 'invalid.email');
  await page.fill('input[name="password"]', 'validpassword123');
  await page.click('button[type="submit"]');
  await page.isVisible(
    "text='Validation error: '/six-cities/login''"
  );
  expect(page.url()).toBe('http://localhost:5173/login');

  // invalid password: no digit
  await page.fill('input[name="email"]', 'valid@email.com');
  await page.fill('input[name="password"]', 'invalidpassword');
  await page.click('button[type="submit"]');
  await page.isVisible(
    "text='Validation error: '/six-cities/login''"
  );
  expect(page.url()).toBe('http://localhost:5173/login');

  // invalid password: no letter
  await page.fill('input[name="email"]', 'valid@email.com');
  await page.fill('input[name="password"]', '123123');
  await page.click('button[type="submit"]');
  await page.isVisible(
    "text='Validation error: '/six-cities/login''"
  );
  expect(page.url()).toBe('http://localhost:5173/login');

  await page.fill('input[name="email"]', 'valid@email.com');
  await page.fill('input[name="password"]', 'validpassword123');
  await Promise.all([
    page.waitForURL('http://localhost:5173'),
    page.click('button[type="submit"]'),
  ]);
});
