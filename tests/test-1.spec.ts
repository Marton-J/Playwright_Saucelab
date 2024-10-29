import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-credentials"]').dblclick();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('asas');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('as');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('asa');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="pony-express"]').click();
  await page.locator('[data-test="complete-header"]').click();
  await page.locator('[data-test="complete-text"]').click();
  await page.locator('[data-test="title"]').click();
  await page.getByText('Swag Labs').click();
  await page.locator('[data-test="continue-shopping"]').click();
});