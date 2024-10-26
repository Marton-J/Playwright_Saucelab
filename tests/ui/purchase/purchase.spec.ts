import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage';
import { PurchasePage } from '../../../pageObjects/ui/purchasePage';
import { locatorsPurchase } from '../../../locators/locatorsPurchase';
import * as dotenv from 'dotenv';

dotenv.config();

let browser;
let page;
let loginPage: LoginPage;
let purchasePage: PurchasePage;

test.describe('Purchase product flow standard_user', {
  tag: '@UI_Test_Login_Flow',
}, () => {
  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    purchasePage = new PurchasePage(page);
    await loginPage.performLogin();
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Purchase product - Sort on: Price (low to high)', async () => {
    await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
    const currentUrl = await page.url();
    expect(currentUrl).toBe(locatorsPurchase.purchasePageTile);
    await purchasePage.purchaseProductSortByPrice();
  });

  test('Purchase product - Add the last product to the cart', async () => {
    await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
    const currentUrl = await page.url();
    expect(currentUrl).toBe(locatorsPurchase.purchasePageTile);
    await purchasePage.addLastElementToCart();
  });

  test('Purchase product - Sort on: Name (A to Z)', async () => {
    await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
    const currentUrl = await page.url();
    expect(currentUrl).toBe(locatorsPurchase.purchasePageTile);
    await purchasePage.purchaseProductSortByNameAZ();
  });

    test('Purchase product - Add the top right product to the cart', async () => {
      await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
      const currentUrl = await page.url();
      expect(currentUrl).toBe(locatorsPurchase.purchasePageTile);
      await purchasePage.addSecondElementToCart();
    });

    test('Purchase product - Proceed to checkout', async () => {
      await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
      const currentUrl = await page.url();
      expect(currentUrl).toBe(locatorsPurchase.purchasePageTile);
      await purchasePage.addSecondElementToCart();

      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.locator('[data-test="title"]').click();
      await page.locator('[data-test="cart-quantity-label"]').click();
      await page.locator('[data-test="cart-desc-label"]').click();
      await page.locator('[data-test="continue-shopping"]').click();
    });
  });
