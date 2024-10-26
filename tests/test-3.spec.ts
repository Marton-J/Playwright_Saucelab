import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').dblclick();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="title"]').click();
  await page.locator('[data-test="cart-quantity-label"]').click();
  await page.locator('[data-test="cart-desc-label"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
});